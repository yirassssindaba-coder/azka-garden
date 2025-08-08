import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Shield, Code } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { currentSession, startNewSession, sendMessage } = useChat();

  useEffect(() => {
    if (isOpen && !currentSession && user) {
      initializeChat();
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const initializeChat = async () => {
    if (!user) return;
    
    try {
      await startNewSession();
    } catch (error) {
      console.error('Failed to initialize chat:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !currentSession || !user) return;

    setInputMessage('');
    setIsTyping(true);

    try {
      await sendMessage(inputMessage);
      
      // Simulate admin/developer response based on message content
      setTimeout(async () => {
        let responseMessage = '';
        let responderName = '';
        let responderRole: 'admin' | 'developer' = 'admin';

        // Determine if message should be handled by admin or developer
        const techKeywords = ['error', 'bug', 'api', 'database', 'sistem', 'teknis', 'code', 'development'];
        const isTechnical = techKeywords.some(keyword => 
          inputMessage.toLowerCase().includes(keyword)
        );

        if (isTechnical) {
          responderRole = 'developer';
          responderName = 'Tim Pengembang Azka Garden';
          responseMessage = `Terima kasih atas laporan teknis Anda. Tim pengembang akan segera menangani masalah ini. Kami akan memberikan update dalam 24 jam.`;
        } else {
          responderRole = 'admin';
          responderName = 'Customer Service Azka Garden';
          responseMessage = `Halo! Terima kasih telah menghubungi Azka Garden. Kami akan membantu Anda dengan pertanyaan tentang tanaman hias. Ada yang spesifik yang ingin Anda tanyakan?`;
        }

        // Add response message
        const responseMsg = {
          id: 'msg-' + Date.now(),
          senderId: responderRole === 'admin' ? 'admin-1' : 'dev-1',
          senderName: responderName,
          senderRole: responderRole,
          message: responseMessage,
          timestamp: new Date(),
          isRead: false
        };

        // Update chat session with response
        const sessions = JSON.parse(localStorage.getItem('chat-sessions') || '[]');
        const updatedSessions = sessions.map((session: any) => 
          session.id === currentSession.id
            ? {
                ...session,
                messages: [...session.messages, responseMsg],
                updatedAt: new Date()
              }
            : session
        );
        localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
        
        setIsTyping(false);
        window.location.reload(); // Refresh to show new message
      }, 2000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsTyping(false);
    }
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
            <h3 className="font-semibold">Asisten Azka Garden</h3>
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