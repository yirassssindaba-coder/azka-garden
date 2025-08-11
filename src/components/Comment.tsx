import React, { useState } from 'react';
import { Comment as CommentType } from '../types/comment';
import CommentReply from './CommentReply';
import LikeButton from './LikeButton';
import Avatar from './Avatar';
import './Comment.css';

interface CommentProps {
  comment: CommentType;
  onLike: (commentId: string, replyId?: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onLike }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      // Handle reply submission logic here
      setReplyContent('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="comment">
      <div className="comment-main">
        <Avatar user={comment.user} />
        
        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-author">{comment.user.name}</span>
            <span className={`comment-role ${comment.user.role.toLowerCase()}`}>
              {comment.user.role}
            </span>
            <span className="comment-date">{comment.date}</span>
          </div>
          
          <p className="comment-text">{comment.content}</p>
          
          <div className="comment-actions">
            <LikeButton
              likes={comment.likes}
              isLiked={comment.isLiked}
              onClick={() => onLike(comment.id)}
            />
            <button
              className="reply-button"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              Balas
            </button>
          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map(reply => (
            <CommentReply
              key={reply.id}
              reply={reply}
              onLike={(replyId) => onLike(comment.id, replyId)}
            />
          ))}
        </div>
      )}

      {showReplyForm && (
        <form className="reply-form" onSubmit={handleReplySubmit}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Tulis balasan..."
            className="reply-textarea"
            rows={3}
          />
          <div className="reply-form-actions">
            <button type="button" onClick={() => setShowReplyForm(false)}>
              Batal
            </button>
            <button type="submit" disabled={!replyContent.trim()}>
              Balas
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comment;
