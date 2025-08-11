import React from 'react';
import { CommentReply as CommentReplyType } from '../types/comment';
import LikeButton from './LikeButton';
import Avatar from './Avatar';
import './CommentReply.css';

interface CommentReplyProps {
  reply: CommentReplyType;
  onLike: (replyId: string) => void;
}

const CommentReply: React.FC<CommentReplyProps> = ({ reply, onLike }) => {
  return (
    <div className="comment-reply">
      <Avatar user={reply.user} size="small" />
      
      <div className="reply-content">
        <div className="reply-header">
          <span className="reply-author">{reply.user.name}</span>
          <span className={`reply-role ${reply.user.role.toLowerCase()}`}>
            {reply.user.role}
          </span>
          <span className="reply-date">{reply.date}</span>
        </div>
        
        <p className="reply-text">{reply.content}</p>
        
        <div className="reply-actions">
          <LikeButton
            likes={reply.likes}
            isLiked={reply.isLiked}
            onClick={() => onLike(reply.id)}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
