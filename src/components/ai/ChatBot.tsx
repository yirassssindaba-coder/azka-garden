import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Shield, Code } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'admin' | 'developer';
  message: string;
  timestamp: Date;
  isRead: boolean;
  replyTo?: string;
}

interface ChatSession {
  id: string;
  customerId: string;
  customerName: string;
  status: 'active' | 'resolved' | 'escalated';
  messages: ChatMessage[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && !currentSession && user) {
      initializeChat();
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  useEffect(() => {
    // Load existing session for user
    if (user) {
      const savedSessions = JSON.parse(localStorage.getItem('chat-sessions') || '[]');
      const userSession = savedSessions.find((s: ChatSession) => s.customerId === user.id);
      if (userSession) {
        setCurrentSession({
          ...userSession,
          createdAt: new Date(userSession.createdAt),
          updatedAt: new Date(userSession.updatedAt),
          messages: userSession.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        });
      }
    }
  }, [user]);

  const initializeChat = async () => {
    if (!user) return;
    
    try {
      const newSession: ChatSession = {
        id: 'session-' + Date.now(),
        customerId: user.id,
        customerName: user.fullName || user.email,
        status: 'active',
        messages: [{
          id: 'msg-welcome',
          senderId: 'system',
          senderName: 'Sistem',
          senderRole: 'admin',
          message: 'Halo! Selamat datang di customer service Azka Garden. Ada yang bisa kami bantu?',
          timestamp: new Date(),
          isRead: false
        }],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setCurrentSession(newSession);
      
      // Save to localStorage
      const savedSessions = JSON.parse(localStorage.getItem('chat-sessions') || '[]');
      const updatedSessions = [newSession, ...savedSessions.filter((s: ChatSession) => s.customerId !== user.id)];
      localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
    } catch (error) {
      console.error('Failed to initialize chat:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const detectMessageType = (message: string): 'admin' | 'developer' => {
    const techKeywords = ['error', 'bug', 'api', 'database', 'sistem', 'teknis', 'code', 'development', 'server', 'website rusak', 'tidak bisa akses'];
    const isTechnical = techKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    return isTechnical ? 'developer' : 'admin';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentSession || !user) return;

    const newMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: user.id,
      senderName: user.fullName || user.email,
      senderRole: 'customer',
      message: inputMessage,
      timestamp: new Date(),
      isRead: false
    };

    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, newMessage],
      updatedAt: new Date()
    };

    setCurrentSession(updatedSession);
    setInputMessage('');
    setIsTyping(true);

    // Save to localStorage
    const savedSessions = JSON.parse(localStorage.getItem('chat-sessions') || '[]');
    const updatedSessions = savedSessions.map((s: ChatSession) => 
      s.id === currentSession.id ? updatedSession : s
    );
    if (!savedSessions.find((s: ChatSession) => s.id === currentSession.id)) {
      updatedSessions.unshift(updatedSession);
    }
    localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));

    // Determine response type and create auto-reply
    const responseType = detectMessageType(inputMessage);
    
    setTimeout(() => {
      let responseMessage = '';
      let responderName = '';
      let responderId = '';

      if (responseType === 'developer') {
        responderId = 'dev-001';
        responderName = 'Tim Pengembang Azka Garden';
        responseMessage = `Terima kasih atas laporan teknis Anda. Tim pengembang akan segera menangani masalah "${inputMessage.substring(0, 50)}...". Kami akan memberikan update dalam 24 jam.`;
      } else {
        responderId = 'admin-001';
        responderName = 'Customer Service Azka Garden';
        responseMessage = `Halo ${user.fullName || user.email}! Terima kasih telah menghubungi Azka Garden. Kami akan membantu Anda dengan pertanyaan tentang "${inputMessage.substring(0, 50)}...". Ada yang spesifik yang ingin Anda tanyakan?`;
      }

      const autoReply: ChatMessage = {
        id: 'msg-' + Date.now(),
        senderId: responderId,
        senderName: responderName,
        senderRole: responseType,
        message: responseMessage,
        timestamp: new Date(),
        isRead: false,
        replyTo: newMessage.id
      };

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, autoReply],
        updatedAt: new Date()
      };

      setCurrentSession(finalSession);
      setIsTyping(false);

      // Update localStorage
      const sessions = JSON.parse(localStorage.getItem('chat-sessions') || '[]');
      const finalSessions = sessions.map((s: ChatSession) => 
        s.id === currentSession.id ? finalSession : s
      );
      localStorage.setItem('chat-sessions', JSON.stringify(finalSessions));
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'developer':
        return <Code className="h-4 w-4 text-blue-600" />;
      default:
        return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-green-500 text-white';
      case 'developer':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (!user) {
    return (
      <button
        onClick={() => alert('Silakan login terlebih dahulu untuk menggunakan chat')}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50 animate-pulse"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">Customer Service Azka Garden</h3>
            <p className="text-xs text-green-100">Online - Siap membantu</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-green-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
        {currentSession?.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs ${message.senderId === user.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.senderId === user.id
                  ? 'bg-blue-500 text-white' 
                  : getRoleColor(message.senderRole)
              }`}>
                {message.senderId === user.id ? (
                  <User className="h-4 w-4" />
                ) : (
                  getRoleIcon(message.senderRole)
                )}
              </div>
              <div className={`rounded-lg p-3 ${
                message.senderId === user.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === user.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {formatTime(message.timestamp)} • {message.senderName}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-xs">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-600 p-4 bg-white dark:bg-gray-800 rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan Anda..."
            className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping || !currentSession}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;