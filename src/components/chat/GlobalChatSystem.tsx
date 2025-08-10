import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Users, X, Minimize2, Maximize2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  type: 'user' | 'system';
}

interface GlobalChatSystemProps {
  className?: string;
}

export const GlobalChatSystem: React.FC<GlobalChatSystemProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      loadMessages();
      // Simulate online users count
      setOnlineUsers(Math.floor(Math.random() * 50) + 10);
    }
  }, [isOpen]);

  const loadMessages = async () => {
    setIsLoading(true);
    try {
      // Simulate loading messages - replace with actual Supabase query
      const demoMessages: ChatMessage[] = [
        {
          id: '1',
          content: 'Selamat datang di chat global! 🌿',
          senderId: 'system',
          senderName: 'System',
          timestamp: new Date(Date.now() - 3600000),
          type: 'system'
        },
        {
          id: '2',
          content: 'Halo semua! Ada yang bisa bantu saya dengan perawatan tanaman hias?',
          senderId: 'user1',
          senderName: 'Budi Santoso',
          timestamp: new Date(Date.now() - 1800000),
          type: 'user'
        },
        {
          id: '3',
          content: 'Tentu! Tanaman apa yang ingin kamu rawat?',
          senderId: 'user2',
          senderName: 'Sari Dewi',
          timestamp: new Date(Date.now() - 1200000),
          type: 'user'
        }
      ];
      setMessages(demoMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      senderId: user.id,
      senderName: user.email?.split('@')[0] || 'User',
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // TODO: Send to Supabase
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 ${className}`}
        aria-label="Buka Chat Global"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
          {onlineUsers}
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 ${className}`}>
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5" />
          <div>
            <h3 className="font-semibold text-white">Chat Global</h3>
            <div className="flex items-center space-x-2 text-green-100 text-sm">
              <Users className="w-4 h-4" />
              <span>{onlineUsers} online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:text-green-200 transition-colors p-1"
            aria-label={isMinimized ? "Perbesar" : "Perkecil"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-green-200 transition-colors p-1"
            aria-label="Tutup Chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.senderId === user?.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : msg.type === 'system'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-white text-gray-900 border border-green-200 shadow-md'
                  } transition-all duration-200 hover:shadow-lg`}>
                    {msg.senderId !== user?.id && msg.type !== 'system' && (
                      <div className="text-xs font-medium text-green-600 mb-1">
                        {msg.senderName}
                      </div>
                    )}
                    <div className="text-sm leading-relaxed">{msg.content}</div>
                    <div className={`text-xs mt-1 ${
                      msg.senderId === user?.id 
                        ? 'text-green-100' 
                        : 'text-gray-500'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
            {user ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pesan..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all duration-200 hover:shadow-md disabled:hover:shadow-none"
                  aria-label="Kirim Pesan"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-gray-600 text-sm mb-3">
                  Silakan login untuk bergabung dalam chat
                </p>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalChatSystem;