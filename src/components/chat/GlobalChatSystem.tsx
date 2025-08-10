import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Shield, Code, Clock, Users, Globe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface GlobalMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'admin' | 'developer';
  message: string;
  timestamp: Date;
  isRead: boolean;
  roomId: string;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: 'general' | 'support' | 'technical';
  participants: string[];
  messages: GlobalMessage[];
  isActive: boolean;
}

const GlobalChatSystem: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('general');
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    initializeChatRooms();
    loadOnlineUsers();
    
    // Real-time updates every 2 seconds
    const interval = setInterval(() => {
      loadChatMessages();
      updateOnlineUsers();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const initializeChatRooms = () => {
    const defaultRooms: ChatRoom[] = [
      {
        id: 'general',
        name: 'Chat Umum',
        description: 'Diskusi umum tentang tanaman hias',
        type: 'general',
        participants: [],
        messages: [
          {
            id: 'msg-1',
            senderId: 'admin-1',
            senderName: 'Admin Azka Garden',
            senderRole: 'admin',
            message: 'Selamat datang di chat global Azka Garden! Silakan bertanya tentang tanaman hias atau berbagi pengalaman.',
            timestamp: new Date(Date.now() - 3600000),
            isRead: true,
            roomId: 'general'
          }
        ],
        isActive: true
      },
      {
        id: 'support',
        name: 'Customer Support',
        description: 'Bantuan dan dukungan pelanggan',
        type: 'support',
        participants: [],
        messages: [
          {
            id: 'msg-2',
            senderId: 'admin-1',
            senderName: 'CS Azka Garden',
            senderRole: 'admin',
            message: 'Tim customer service siap membantu Anda 24/7. Tanyakan apapun tentang produk, pengiriman, atau perawatan tanaman.',
            timestamp: new Date(Date.now() - 1800000),
            isRead: true,
            roomId: 'support'
          }
        ],
        isActive: true
      },
      {
        id: 'technical',
        name: 'Technical Support',
        description: 'Bantuan teknis website dan aplikasi',
        type: 'technical',
        participants: [],
        messages: [
          {
            id: 'msg-3',
            senderId: 'dev-1',
            senderName: 'Developer Azka Garden',
            senderRole: 'developer',
            message: 'Laporkan bug, masalah teknis, atau saran pengembangan website di sini. Tim developer akan segera merespons.',
            timestamp: new Date(Date.now() - 900000),
            isRead: true,
            roomId: 'technical'
          }
        ],
        isActive: true
      }
    ];

    const savedRooms = localStorage.getItem('global-chat-rooms');
    if (savedRooms) {
      try {
        const parsedRooms = JSON.parse(savedRooms).map((room: any) => ({
          ...room,
          messages: room.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatRooms(parsedRooms);
      } catch (error) {
        setChatRooms(defaultRooms);
        localStorage.setItem('global-chat-rooms', JSON.stringify(defaultRooms));
      }
    } else {
      setChatRooms(defaultRooms);
      localStorage.setItem('global-chat-rooms', JSON.stringify(defaultRooms));
    }
  };

  const loadChatMessages = () => {
    const savedRooms = localStorage.getItem('global-chat-rooms');
    if (savedRooms) {
      try {
        const parsedRooms = JSON.parse(savedRooms).map((room: any) => ({
          ...room,
          messages: room.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatRooms(parsedRooms);
      } catch (error) {
        console.error('Error loading chat messages:', error);
      }
    }
  };

  const loadOnlineUsers = () => {
    const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
    setOnlineUsers(activeSessions.slice(0, 10)); // Show last 10 active users
  };

  const updateOnlineUsers = () => {
    if (user) {
      const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '[]');
      const existingSession = activeSessions.find((s: any) => s.userId === user.id);
      
      if (existingSession) {
        existingSession.lastActivity = new Date().toISOString();
      } else {
        activeSessions.push({
          userId: user.id,
          userEmail: user.email,
          userName: user.fullName || user.email,
          userRole: user.role,
          loginTime: new Date().toISOString(),
          lastActivity: new Date().toISOString()
        });
      }
      
      localStorage.setItem('active_sessions', JSON.stringify(activeSessions));
      setOnlineUsers(activeSessions.slice(0, 10));
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const message: GlobalMessage = {
      id: 'msg-' + Date.now(),
      senderId: user.id,
      senderName: user.fullName || user.email,
      senderRole: user.role.toLowerCase() as 'customer' | 'admin' | 'developer',
      message: newMessage,
      timestamp: new Date(),
      isRead: false,
      roomId: selectedRoom
    };

    const updatedRooms = chatRooms.map(room =>
      room.id === selectedRoom
        ? {
            ...room,
            messages: [...room.messages, message],
            participants: room.participants.includes(user.id) 
              ? room.participants 
              : [...room.participants, user.id]
          }
        : room
    );

    setChatRooms(updatedRooms);
    localStorage.setItem('global-chat-rooms', JSON.stringify(updatedRooms));
    setNewMessage('');
  };

  const selectedRoomData = chatRooms.find(room => room.id === selectedRoom);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4 text-green-600" />;
      case 'developer': return <Code className="h-4 w-4 text-blue-600" />;
      default: return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-green-500 text-white';
      case 'developer': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-padding">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mobile-text-sm">Chat Global Azka Garden</h1>
          <p className="text-gray-600 mobile-text-xs">
            Bergabung dengan komunitas pecinta tanaman hias dan dapatkan bantuan dari tim ahli kami
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mobile-grid-1 mobile-space-y-2">
          {/* Chat Rooms & Online Users */}
          <div className="space-y-4">
            {/* Room Selection */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 mobile-card">
              <div className="p-4 border-b border-gray-200 mobile-p-3">
                <h3 className="font-bold text-gray-900 mobile-text-sm">Chat Rooms</h3>
              </div>
              <div className="p-4 space-y-2 mobile-p-3">
                {chatRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors mobile-nav-item ${
                      selectedRoom === room.id
                        ? 'bg-green-100 text-green-800'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="font-medium mobile-text-sm">{room.name}</div>
                    <div className="text-xs text-gray-600 mobile-text-xs">{room.description}</div>
                    <div className="text-xs text-gray-500 mt-1 mobile-text-xs">
                      {room.messages.length} pesan • {room.participants.length} peserta
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Online Users */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 mobile-card">
              <div className="p-4 border-b border-gray-200 mobile-p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-gray-900 mobile-text-sm">Online ({onlineUsers.length})</h3>
                </div>
              </div>
              <div className="p-4 space-y-2 max-h-60 overflow-y-auto mobile-p-3">
                {onlineUsers.map((userSession, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xs">
                        {userSession.userName?.charAt(0) || userSession.userEmail?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate mobile-text-xs">
                        {userSession.userName || userSession.userEmail}
                      </div>
                      <div className="text-xs text-gray-500 mobile-text-xs">
                        {userSession.userRole || 'customer'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-96 mobile-card">
            {selectedRoomData && (
              <>
                <div className="p-4 border-b border-gray-200 mobile-p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 mobile-text-sm">{selectedRoomData.name}</h3>
                      <p className="text-sm text-gray-600 mobile-text-xs">{selectedRoomData.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 mobile-text-xs">Global</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 mobile-p-3">
                  {selectedRoomData.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.senderId === user?.id
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-white text-gray-900 border border-green-200 shadow-md'
                      }`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium mobile-text-xs">{msg.senderName}</span>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            msg.senderRole === 'admin' ? 'bg-green-500 text-white' :
                            msg.senderRole === 'developer' ? 'bg-green-700 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {getRoleIcon(msg.senderRole)}
                          </div>
                        </div>
                        <p className="text-sm mobile-text-xs break-words">{msg.message}</p>
                        <p className={`text-xs mt-1 mobile-text-xs ${
                          msg.senderId === user?.id ? 'text-green-100' : 'text-gray-500'
                        }`}>{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {user && (
                  <div className="p-4 border-t border-gray-200 mobile-p-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ketik pesan global..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm mobile-form-input"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 mobile-btn"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChatSystem;