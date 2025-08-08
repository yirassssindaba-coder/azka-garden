import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Shield, Code, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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

const CustomerService: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const { user } = useAuth();

  useEffect(() => {
    loadChatSessions();
    
    // Auto-refresh every 3 seconds for real-time updates
    const interval = setInterval(loadChatSessions, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadChatSessions = () => {
    try {
      const savedSessions = localStorage.getItem('chat-sessions');
      if (savedSessions) {
        const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setSessions(parsedSessions);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedSession || !user) return;

    const session = sessions.find(s => s.id === selectedSession);
    if (!session) return;

    const newMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: user.id,
      senderName: user.fullName || user.email,
      senderRole: user.role.toLowerCase() as 'admin' | 'developer',
      message: replyMessage,
      timestamp: new Date(),
      isRead: false
    };

    const updatedSession = {
      ...session,
      messages: [...session.messages, newMessage],
      updatedAt: new Date()
    };

    const updatedSessions = sessions.map(s => 
      s.id === selectedSession ? updatedSession : s
    );

    setSessions(updatedSessions);
    localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
    setReplyMessage('');
  };

  const handleResolveSession = (sessionId: string) => {
    const updatedSessions = sessions.map(session =>
      session.id === sessionId
        ? { ...session, status: 'resolved' as const, updatedAt: new Date() }
        : session
    );
    setSessions(updatedSessions);
    localStorage.setItem('chat-sessions', JSON.stringify(updatedSessions));
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  const selectedSessionData = sessions.find(s => s.id === selectedSession);

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
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'developer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'developer': return 'Pengembang';
      default: return 'Pelanggan';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Customer Service</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Kelola percakapan dengan pelanggan dan berikan dukungan terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Session List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Chat Sessions</h2>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                  {sessions.length} total
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === 'active' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Aktif
                </button>
                <button
                  onClick={() => setFilter('resolved')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === 'resolved' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Selesai
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto h-80">
              {filteredSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className={`w-full text-left p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedSession === session.id ? 'bg-green-50 dark:bg-green-900' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white text-sm truncate">{session.customerName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      session.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {session.messages[session.messages.length - 1]?.message.substring(0, 50) || 'Belum ada pesan'}...
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {formatTime(session.updatedAt)}
                  </div>
                </button>
              ))}
              
              {filteredSessions.length === 0 && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Tidak ada chat session</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
            {selectedSessionData ? (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{selectedSessionData.customerName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Customer ID: {selectedSessionData.customerId}</p>
                  </div>
                  {selectedSessionData.status === 'active' && (
                    <button
                      onClick={() => handleResolveSession(selectedSessionData.id)}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Selesai</span>
                    </button>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900 min-h-0">
                  {selectedSessionData.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg break-words ${
                        msg.senderId === user?.id
                          ? 'bg-green-600 text-white'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                      }`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium">{msg.senderName}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(msg.senderRole)}`}>
                            {getRoleLabel(msg.senderRole)}
                          </span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-75 mt-1">{formatTime(msg.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                      placeholder="Ketik balasan..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Pilih chat session untuk membalas</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Chat</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{sessions.length}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktif</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {sessions.filter(s => s.status === 'active').length}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Selesai</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {sessions.filter(s => s.status === 'resolved').length}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2.5m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;