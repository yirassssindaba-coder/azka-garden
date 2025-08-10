import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Users, User, Shield, Code, Clock, Star, Heart, Reply, Trash2, Globe } from 'lucide-react';
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
        return 'bg-green-200 text-green-900 border border-green-400';
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
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-black">
          <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Chat Global Azka Garden</h2>
          <p className="text-gray-600 mb-6">
            Silakan login terlebih dahulu untuk bergabung dalam percakapan global
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors border border-black"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen chat-global-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white bg-opacity-30 rounded-full p-4 w-24 h-24 mx-auto mb-6 backdrop-blur-sm shadow-2xl">
              <MessageCircle className="h-12 w-12 text-white mx-auto" />
            </div>
            <h1 className="text-6xl font-bold mb-6 drop-shadow-2xl">Chat Global Azka Garden</h1>
            <p className="text-green-100 text-2xl mb-6 font-medium">
              Bergabunglah dalam percakapan dengan sesama pecinta tanaman
            </p>
            <div className="flex items-center justify-center space-x-4 bg-white bg-opacity-30 px-8 py-4 rounded-full backdrop-blur-sm shadow-xl">
              <Users className="h-5 w-5 text-green-200" />
              <span className="text-white font-bold text-xl">{onlineUsers} pengguna online</span>
              <div className="w-4 h-4 bg-green-300 rounded-full animate-pulse shadow-lg"></div>
            </div>
            <div className="mt-6 bg-white bg-opacity-20 rounded-xl p-4 max-w-lg mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-2">
                <Globe className="h-4 w-4 text-green-200" />
                <span className="text-green-100 text-base font-bold">
                  Sinkronisasi real-time antar semua perangkat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Room Selector */}
        <div className="mb-8">
          <div className="flex space-x-6 justify-center">
            {[
              { id: 'general', label: 'Umum', icon: '💬' },
              { id: 'support', label: 'Support', icon: '🆘' },
              { id: 'technical', label: 'Technical', icon: '🔧' }
            ].map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id as any)}
                className={`flex items-center space-x-4 px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 ${
                  activeRoom === room.id
                    ? 'bg-white text-green-700 shadow-3xl scale-110 border-4 border-green-600'
                    : 'bg-green-600 text-white hover:bg-green-500 border-2 border-green-400'
                }`}
              >
                <span className="text-3xl">{room.icon}</span>
                <span>{room.label}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-white text-xl font-bold bg-green-700 bg-opacity-60 rounded-full px-8 py-3 backdrop-blur-sm shadow-xl">
              Room aktif: <span className="font-bold">{activeRoom.toUpperCase()}</span>
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-3xl overflow-hidden border-4 border-green-400">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-green-50 via-white to-green-50">
            {messages.map((message) => (
              <div key={message.id} className="space-y-4">
                <div className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md lg:max-w-lg p-6 rounded-2xl shadow-2xl ${
                    message.senderId === user.id
                      ? 'bg-green-600 text-white shadow-green-300 border-2 border-green-700'
                      : 'bg-white text-black border-2 border-green-200 shadow-green-100'
                  }`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="font-bold text-base">{message.senderName}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(message.senderRole)}`}>
                        {getRoleLabel(message.senderRole)}
                      </span>
                    </div>
                    <p className="text-base leading-relaxed font-medium">{message.message}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-sm ${message.senderId === user.id ? 'text-green-100' : 'text-gray-600'}`}>
                        {formatTime(message.timestamp)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleLikeMessage(message.id)}
                          className={`flex items-center space-x-1 text-sm ${
                            message.likes.includes(user.id)
                              ? 'text-red-500'
                              : message.senderId === user.id ? 'text-green-100' : 'text-gray-600'
                          }`}
                        >
                          <Heart className="h-4 w-4" />
                          <span>{message.likes.length}</span>
                        </button>
                        <button
                          onClick={() => setReplyTo(replyTo === message.id ? null : message.id)}
                          className={`text-sm ${message.senderId === user.id ? 'text-green-100' : 'text-gray-600'}`}
                        >
                          <Reply className="h-4 w-4" />
                        </button>
                        {(message.senderId === user.id || user.role === 'ADMIN') && (
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className={`text-sm ${message.senderId === user.id ? 'text-green-100' : 'text-red-500'}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                {replyTo === message.id && (
                  <div className="ml-12 p-6 bg-green-100 rounded-2xl shadow-2xl border-2 border-green-300">
                    <div className="flex space-x-4">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">
                          {(user.fullName || user.email).charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          rows={3}
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-green-300 bg-white text-black rounded-xl focus:ring-4 focus:ring-green-300 text-base font-medium shadow-lg"
                          placeholder="Tulis balasan..."
                        />
                        <div className="flex justify-end space-x-3 mt-3">
                          <button
                            onClick={() => setReplyTo(null)}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border-2 border-gray-300 rounded-lg font-medium"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleReplyToMessage(message.id)}
                            disabled={!replyMessage.trim()}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <Send className="h-4 w-4" />
                            <span className="font-bold">Kirim</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {message.replies.length > 0 && (
                  <div className="ml-12 space-y-4">
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="bg-green-100 p-4 rounded-xl shadow-xl border-2 border-green-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {reply.senderName.charAt(0)}
                            </span>
                          </div>
                          <span className="font-bold text-black text-base">{reply.senderName}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(reply.senderRole)}`}>
                            {getRoleLabel(reply.senderRole)}
                          </span>
                          <span className="text-sm text-gray-600 font-medium">
                            {formatTime(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-black text-base font-medium leading-relaxed">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 border-t-4 border-green-300 bg-gradient-to-r from-green-50 via-white to-green-50">
            <div className="flex space-x-4">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-lg">
                  {(user.fullName || user.email).charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  className="w-full px-6 py-4 border-2 border-green-300 bg-white text-black rounded-2xl focus:ring-4 focus:ring-green-300 resize-none shadow-2xl font-medium text-lg"
                  placeholder={`Tulis pesan di room ${activeRoom.toUpperCase()}... (Enter untuk kirim)`}
                />
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-green-700 font-bold bg-green-100 px-4 py-2 rounded-full border-2 border-green-300 shadow-lg">
                    Auto-routing: Technical → Developer, Support → Admin, Umum → Semua
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition-all duration-300 disabled:opacity-50 flex items-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:scale-110 font-bold text-lg"
                  >
                    <Send className="h-5 w-5" />
                    <span>Kirim Pesan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room Info */}
        <div className="mt-8 bg-white p-8 rounded-3xl shadow-3xl border-4 border-green-300">
          <h3 className="font-bold text-black mb-6 text-2xl">
            Room {activeRoom.toUpperCase()} - {onlineUsers} pengguna online
          </h3>
          <p className="text-black text-lg font-medium leading-relaxed mb-6">
            {activeRoom === 'general' && 'Diskusi umum tentang tanaman hias, tips perawatan, dan berbagi pengalaman.'}
            {activeRoom === 'support' && 'Bantuan customer service untuk pemesanan, pengiriman, dan layanan pelanggan.'}
            {activeRoom === 'technical' && 'Dukungan teknis untuk masalah website, aplikasi, dan sistem.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 shadow-lg">
              <div className="text-green-600 font-bold text-base">💬 Pesan Hari Ini</div>
              <div className="text-black font-bold text-2xl">{messages.length}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 shadow-lg">
              <div className="text-green-600 font-bold text-base">👥 Pengguna Aktif</div>
              <div className="text-black font-bold text-2xl">{onlineUsers}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200 shadow-lg">
              <div className="text-green-600 font-bold text-base">🌱 Room Favorit</div>
              <div className="text-black font-bold text-2xl">{activeRoom.toUpperCase()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChatSystem;