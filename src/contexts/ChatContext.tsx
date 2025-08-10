import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'admin' | 'developer';
  message: string;
  timestamp: Date;
  isRead: boolean;
  replyTo?: string;
}

export interface ChatSession {
  id: string;
  customerId: string;
  customerName: string;
  status: 'active' | 'resolved' | 'escalated';
  messages: ChatMessage[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  sendMessage: (message: string, replyTo?: string) => Promise<void>;
  startNewSession: () => Promise<string>;
  assignSession: (sessionId: string, adminId: string) => Promise<void>;
  resolveSession: (sessionId: string) => Promise<void>;
  getSessionById: (sessionId: string) => ChatSession | null;
  getUnreadCount: () => number;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Load chat sessions from localStorage
    const savedSessions = localStorage.getItem('chat-sessions');
    if (savedSessions) {
      try {
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
      } catch (error) {
        console.error('Error loading chat sessions:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save sessions to localStorage
    if (sessions.length > 0) {
      localStorage.setItem('chat-sessions', JSON.stringify(sessions));
    }
  }, [sessions]);

  const sendMessage = async (message: string, replyTo?: string) => {
    if (!user || !currentSession) return;

    const newMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderId: user.id,
      senderName: user.fullName,
      senderRole: user.role,
      message,
      timestamp: new Date(),
      isRead: false,
      replyTo
    };

    setSessions(prev => prev.map(session => 
      session.id === currentSession.id
        ? {
            ...session,
            messages: [...session.messages, newMessage],
            updatedAt: new Date()
          }
        : session
    ));

    // Auto-reply for demo purposes
    if (user.role === 'customer') {
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: 'msg-' + Date.now(),
          senderId: 'admin-1',
          senderName: 'Customer Service',
          senderRole: 'admin',
          message: 'Terima kasih atas pesan Anda. Tim kami akan segera membantu Anda.',
          timestamp: new Date(),
          isRead: false,
          replyTo: newMessage.id
        };

        setSessions(prev => prev.map(session => 
          session.id === currentSession.id
            ? {
                ...session,
                messages: [...session.messages, autoReply],
                updatedAt: new Date()
              }
            : session
        ));
      }, 2000);
    }
  };

  const startNewSession = async (): Promise<string> => {
    if (!user) throw new Error('User must be authenticated');

    const newSession: ChatSession = {
      id: 'session-' + Date.now(),
      customerId: user.id,
      customerName: user.fullName,
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

    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession);
    return newSession.id;
  };

  const assignSession = async (sessionId: string, adminId: string) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, assignedTo: adminId, updatedAt: new Date() }
        : session
    ));
  };

  const resolveSession = async (sessionId: string) => {
    setSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, status: 'resolved', updatedAt: new Date() }
        : session
    ));
  };

  const getSessionById = (sessionId: string): ChatSession | null => {
    return sessions.find(session => session.id === sessionId) || null;
  };

  const getUnreadCount = (): number => {
    return sessions.reduce((count, session) => {
      return count + session.messages.filter(msg => 
        !msg.isRead && msg.senderId !== user?.id
      ).length;
    }, 0);
  };

  return (
    <ChatContext.Provider value={{
      sessions,
      currentSession,
      sendMessage,
      startNewSession,
      assignSession,
      resolveSession,
      getSessionById,
      getUnreadCount
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};