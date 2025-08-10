import React from 'react';
import { Navigate } from 'react-router-dom';

// This component is now handled by the main GlobalChatSystem page
// Redirect to the main chat page
const GlobalChatSystem: React.FC = () => {
  return <Navigate to="/global-chat" replace />;
};

export default GlobalChatSystem;