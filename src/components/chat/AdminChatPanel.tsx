import React, { useState } from 'react';
import { MessageSquare, Send, User, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';

const AdminChatPanel: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const { sessions, sendMessage, resolveSession } = useChat();

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedSession) return;

    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleResolveSession = async (sessionId: string) => {
    try {
      await resolveSession(sessionId);
    } catch (error) {
      console.error('Error resolving session:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-green-600 dark:text-green-400';
      case 'developer': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const selectedSessionData = sessions.find(s => s.id === selectedSession);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-96 flex">
      {/* Session List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white">Chat Sessions</h3>
        </div>
        <div className="overflow-y-auto h-80">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session.id)}
              className={`w-full text-left p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedSession === session.id ? 'bg-green-50 dark:bg-green-900' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-900 dark:text-white text-sm">{session.customerName}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  session.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                }`}>
                  {session.status}
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {session.messages[session.messages.length - 1]?.message.substring(0, 50)}...
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {formatTime(session.updatedAt)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {selectedSessionData ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{selectedSessionData.customerName}</h4>
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
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedSessionData.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.senderId === user?.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium">{msg.senderName}</span>
                      <span className={`text-xs ${getRoleColor(msg.senderRole)}`}>
                        ({getRoleLabel(msg.senderRole)})
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ketik balasan..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
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
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Pilih chat session untuk membalas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPanel;