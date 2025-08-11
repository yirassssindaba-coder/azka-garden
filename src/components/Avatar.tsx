import React from 'react';
import { User } from '../types/comment';
import './Avatar.css';

interface AvatarProps {
  user: User;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 'medium' }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (role: string) => {
    return role === 'Administrator' ? '#2563eb' : '#059669';
  };

  return (
    <div 
      className={`avatar avatar-${size}`}
      style={{ backgroundColor: getAvatarColor(user.role) }}
    >
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} />
      ) : (
        <span className="avatar-initials">{getInitials(user.name)}</span>
      )}
    </div>
  );
};

export default Avatar;
