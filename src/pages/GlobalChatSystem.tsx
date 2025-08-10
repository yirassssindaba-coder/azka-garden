import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Users, User, Shield, Code, Clock, Globe, Heart, Reply, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'admin' | 'developer';
  message: string;
  timestamp: Date;
  isRead: boolean;
  room: 'general' | 'support' | 'technical';
  likes: string[];
  replies: ChatReply[];
}

interface ChatReply {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'admin' | 'developer';
  message: string;
  timestamp: Date;
  likes: string[];
}

const GlobalChatSystem: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeRoom, setActiveRoom] = useState<'general' | 'support' | 'technical'>('general');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadMessages();
    
    // Real-time sync every 2 seconds
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [activeRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    try {
      const savedMessages = localStorage.getItem(`global-chat-${activeRoom}`);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          replies: msg.replies?.map((reply: any) => ({
            ...reply,
            timestamp: new Date(reply.timestamp)
          })) || []
        }));
        setMessages(parsedMessages);
      } else {
        // Initialize with demo messages
        const demoMessages: ChatMessage[] = [
          {
            id: 'msg-1',
            senderId: 'user-sari',
            senderName: 'Sari Dewi',
            senderRole: 'customer',
            message: 'Halo semua! Saya baru beli Monstera dari Azka Garden dan sangat puas dengan kualitasnya. Ada tips perawatan khusus?',
            timestamp: new Date(Date.now() - 3600000),
            isRead: true,
            room: activeRoom,
            likes: ['user-budi'],
            replies: [
              {
                id: 'reply-1',
                senderId: 'admin-1',
                senderName: 'Admin Azka Garden',
                senderRole: 'admin',
                message: 'Terima kasih Sari! Untuk Monstera, pastikan cahaya tidak langsung dan siram ketika tanah mulai kering. Jangan lupa semprot daun sesekali.',
                timestamp: new Date(Date.now() - 3000000),
                likes: ['user-sari']
              }
            ]
          },
          {
            id: 'msg-2',
            senderId: 'user-budi',
            senderName: 'Budi Santoso',
            senderRole: 'customer',
            message: 'Setuju dengan Sari! Pelayanan Azka Garden memang top. Saya sudah order beberapa kali dan selalu puas.',
            timestamp: new Date(Date.now() - 1800000),
            isRead: true,
            room: activeRoom,
            likes: ['user-sari'],
            replies: []
          }
        ];
        setMessages(demoMessages);
        localStorage.setItem(`global-chat-${activeRoom}`, JSON.stringify(demoMessages));
      }
      
      // Simulate online users
      setOnlineUsers(Math.floor(Math.random() * 50) + 20);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = (updatedMessages: ChatMessage[]) => {
    setMessages(updatedMessages);
    localStorage.setItem(`global-chat-${activeRoom}`, JSON.stringify(updatedMessages));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const detectMessageType = (message: string): 'support' | 'technical' | 'general' => {
    const techKeywords = ['error', 'bug', 'api', 'database', 'sistem', 'teknis', 'code', 'development', 'server', 'website rusak', 'tidak bisa akses', 'loading', 'crash', 'broken'];
    const supportKeywords = ['bantuan', 'help', 'support', 'masalah', 'problem', 'keluhan', 'complaint'];
    
    const isTechnical = techKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    
    const isSupport = supportKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    
    if (isTechnical) return 'technical';
    if (isSupport) return 'support';
    return 'general';
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const messageType = detectMessageType(newMessage);
    const targetRoom = messageType;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: user.id,
      senderName: user.fullName || user.email,
      senderRole: user.role.toLowerCase() as 'customer' | 'admin' | 'developer',
      message: newMessage,
      timestamp: new Date(),
      isRead: false,
      room: targetRoom,
      likes: [],
      replies: []
    };

    // Save to appropriate room
    const roomMessages = JSON.parse(localStorage.getItem(`global-chat-${targetRoom}`) || '[]');
    const updatedRoomMessages = [...roomMessages, newMsg];
    localStorage.setItem(`global-chat-${targetRoom}`, JSON.stringify(updatedRoomMessages));

    // If current room, update display
    if (targetRoom === activeRoom) {
      const updatedMessages = [...messages, newMsg];
      saveMessages(updatedMessages);
    }

    setNewMessage('');

    // Show notification if message was routed to different room
    if (targetRoom !== activeRoom) {
      alert(`Pesan Anda telah dikirim ke room ${targetRoom.toUpperCase()}. Pindah ke room tersebut untuk melihat balasan.`);
    }
  };

  const handleLikeMessage = (messageId: string) => {
    if (!user) return;

    const updatedMessages = messages.map(msg =>
      msg.id === messageId
        ? {
            ...msg,
            likes: msg.likes.includes(user.id)
              ? msg.likes.filter(id => id !== user.id)
              : [...msg.likes, user.id]
          }
        : msg
    );

    saveMessages(updatedMessages);
  };

  const handleReplyToMessage = (messageId: string) => {
    if (!user || !replyMessage.trim()) return;

    const newReply: ChatReply = {
      id: 'reply-' + Date.now(),
      senderId: user.id,
      senderName: user.fullName || user.email,
      senderRole: user.role.toLowerCase() as 'customer' | 'admin' | 'developer',
      message: replyMessage,
      timestamp: new Date(),
      likes: []
    };

    const updatedMessages = messages.map(msg =>
      msg.id === messageId
        ? {
            ...msg,
            replies: [...msg.replies, newReply]
          }
        : msg
    );

    saveMessages(updatedMessages);
    setReplyMessage('');
    setReplyTo(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!user) return;
    
    const message = messages.find(m => m.id === messageId);
    if (!message || (message.senderId !== user.id && user.role !== 'ADMIN')) return;

    if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      const updatedMessages = messages.filter(m => m.id !== messageId);
      saveMessages(updatedMessages);
    }
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
        return 'bg-green-100 text-green-800 border border-green-300';
      case 'developer':
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'developer': return 'Pengembang';
      default: return 'Pelanggan';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-green-200">
          <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat Global Azka Garden</h2>
          <p className="text-gray-600 mb-6">
            Silakan login terlebih dahulu untuk bergabung dalam percakapan global
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-green-600 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full p-4 w-20 h-20 mx-auto mb-4">
              <MessageCircle className="h-12 w-12 text-white mx-auto" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Chat Global Azka Garden</h1>
            <p className="text-green-100 text-lg mb-4">
              Bergabunglah dalam percakapan dengan sesama pecinta tanaman
            </p>
            <div className="flex items-center justify-center space-x-4 bg-white bg-opacity-20 px-6 py-3 rounded-full">
              <Users className="h-5 w-5 text-green-200" />
              <span className="text-white font-medium">{onlineUsers} pengguna online</span>
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Room Selector */}
        <div className="mb-6">
          <div className="flex space-x-4 justify-center">
            {[
              { id: 'general', label: 'Umum', icon: '💬', desc: 'Diskusi umum tentang tanaman' },
              { id: 'support', label: 'Support', icon: '🆘', desc: 'Bantuan customer service' },
              { id: 'technical', label: 'Technical', icon: '🔧', desc: 'Dukungan teknis website' }
            ].map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id as any)}
                className={`flex flex-col items-center space-y-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                  activeRoom === room.id
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-50 border-2 border-green-200'
                }`}
              >
                <span className="text-2xl">{room.icon}</span>
                <span className="font-bold">{room.label}</span>
                <span className="text-xs opacity-75">{room.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-200">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-green-50">
            {messages.map((message) => (
              <div key={message.id} className="space-y-3">
                <div className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-4 rounded-lg shadow-md ${
                    message.senderId === user.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-sm">{message.senderName}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(message.senderRole)}`}>
                        {getRoleLabel(message.senderRole)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${message.senderId === user.id ? 'text-green-100' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLikeMessage(message.id)}
                          className={`flex items-center space-x-1 text-xs ${
                            message.likes.includes(user.id)
                              ? 'text-red-500'
                              : message.senderId === user.id ? 'text-green-100' : 'text-gray-500'
                          }`}
                        >
                          <Heart className="h-3 w-3" />
                          <span>{message.likes.length}</span>
                        </button>
                        <button
                          onClick={() => setReplyTo(replyTo === message.id ? null : message.id)}
                          className={`text-xs ${message.senderId === user.id ? 'text-green-100' : 'text-gray-500'}`}
                        >
                          <Reply className="h-3 w-3" />
                        </button>
                        {(message.senderId === user.id || user.role === 'ADMIN') && (
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className={`text-xs ${message.senderId === user.id ? 'text-green-100' : 'text-red-500'}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                {replyTo === message.id && (
                  <div className="ml-8 p-4 bg-green-100 rounded-lg border border-green-200">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {(user.fullName || user.email).charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          rows={2}
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          className="w-full px-3 py-2 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="Tulis balasan..."
                        />
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => setReplyTo(null)}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleReplyToMessage(message.id)}
                            disabled={!replyMessage.trim()}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <Send className="h-3 w-3" />
                            <span>Kirim</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {message.replies.length > 0 && (
                  <div className="ml-8 space-y-3">
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="bg-green-100 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              {reply.senderName.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{reply.senderName}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(reply.senderRole)}`}>
                            {getRoleLabel(reply.senderRole)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatTime(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-900 text-sm">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-green-200 bg-white">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {(user.fullName || user.email).charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  rows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  className="w-full px-4 py-3 border border-green-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder={`Tulis pesan di room ${activeRoom.toUpperCase()}... (Enter untuk kirim)`}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">
                    Auto-routing: Technical → Developer, Support → Admin, Umum → Semua
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Kirim</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Info */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg border-2 border-green-200">
          <h3 className="font-bold text-gray-900 mb-3 text-lg">
            Room {activeRoom.toUpperCase()} - {onlineUsers} pengguna online
          </h3>
          <p className="text-gray-700 mb-4">
            {activeRoom === 'general' && 'Diskusi umum tentang tanaman hias, tips perawatan, dan berbagi pengalaman.'}
            {activeRoom === 'support' && 'Bantuan customer service untuk pemesanan, pengiriman, dan layanan pelanggan.'}
            {activeRoom === 'technical' && 'Dukungan teknis untuk masalah website, aplikasi, dan sistem.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="text-green-600 font-medium text-sm">💬 Pesan Hari Ini</div>
              <div className="text-gray-900 font-bold text-xl">{messages.length}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="text-green-600 font-medium text-sm">👥 Pengguna Aktif</div>
              <div className="text-gray-900 font-bold text-xl">{onlineUsers}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="text-green-600 font-medium text-sm">🌱 Room Favorit</div>
              <div className="text-gray-900 font-bold text-xl">{activeRoom.toUpperCase()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChatSystem;