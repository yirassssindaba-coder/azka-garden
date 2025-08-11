import React from 'react';
import './LikeButton.css';

interface LikeButtonProps {
  likes: number;
  isLiked: boolean;
  onClick: () => void;
  size?: 'small' | 'medium';
}

const LikeButton: React.FC<LikeButtonProps> = ({ 
  likes, 
  isLiked, 
  onClick, 
  size = 'medium' 
}) => {
  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''} like-button-${size}`}
      onClick={onClick}
      aria-label={`${isLiked ? 'Unlike' : 'Like'} this comment`}
    >
      <svg 
        className="like-icon" 
        fill={isLiked ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
      <span className="like-count">{likes}</span>
    </button>
  );
};

export default LikeButton;
