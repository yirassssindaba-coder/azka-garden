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

  // Real-time chat updates
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const savedSessions = JSON.parse(localStorage.getItem('chat-sessions') || '[]');
      const userSession = savedSessions.find((s: ChatSession) => s.customerId === user.id);
      
      if (userSession && currentSession) {
        const sessionMessages = userSession.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        
        // Check if there are new messages
        if (sessionMessages.length > currentSession.messages.length) {
          setCurrentSession({
            ...userSession,
            createdAt: new Date(userSession.createdAt),
            updatedAt: new Date(userSession.updatedAt),
            messages: sessionMessages
          });
        }
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, [user, currentSession]);

  const initializeChat = async () => {
    if (!user) return;
    
    try {
      const newSession: ChatSession = {
        id: 'session-' + Date.now(),
        customerId: user.id,
        customerName: user.fullName || user.email,
        status: 'active',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setCurrentSession(newSession);
      
      // Save to localStorage for cross-device sync
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
    const techKeywords = ['error', 'bug', 'api', 'database', 'sistem', 'teknis', 'code', 'development', 'server', 'website rusak', 'tidak bisa akses', 'loading', 'crash', 'broken'];
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

    // Save to localStorage for cross-device sync
    const savedSessions = JSON.parse(localStorage.getItem('chat-sessions') || '[]');
    const updatedSessions = savedSessions.map((s: ChatSession) => 
      s.id === currentSession.id ? updatedSession : s
    );
    if (!savedSessions.find((s: ChatSession) => s.id === currentSession.id)) {
      updatedSessions.unshift(updatedSession);
    }
    localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));

    // Auto-reply simulation (removed for real chat functionality)
    // Real responses will come from admin/developer portals
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
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors animate-pulse mb-2"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        <div className="text-center">
          <Link
            to="/global-chat"
            className="block bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Chat Global
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col max-w-[calc(100vw-3rem)] mobile-card">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between mobile-p-3">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <div>
            <h3 className="font-semibold mobile-text-sm">Customer Service Azka Garden</h3>
            <p className="text-xs text-green-100 mobile-text-xs">Online - Siap membantu</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to="/global-chat"
            className="text-white hover:text-green-200 transition-colors text-xs mobile-text-xs"
          >
            Global
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-green-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 mobile-p-3">
        {currentSession?.messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <div className="text-center text-gray-500 py-8">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm mobile-text-xs">Menunggu pesan Anda...</p>
            <p className="text-xs mt-2 mobile-text-xs">Tim customer service siap membantu</p>
          </div>
        ) : (
          currentSession?.messages.map((message) => (
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
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <p className="text-sm whitespace-pre-wrap break-words mobile-text-xs">{message.message}</p>
                  <p className={`text-xs mt-1 mobile-text-xs ${
                    message.senderId === user.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)} • {message.senderName}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-xs">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
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
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg mobile-p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan Anda..."
            className="flex-1 border border-gray-300 bg-white text-gray-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent mobile-form-input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping || !currentSession}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mobile-btn"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 text-center">
          <Link
            to="/global-chat"
            className="text-xs text-green-600 hover:text-green-700 mobile-text-xs"
          >
            Buka Chat Global →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;