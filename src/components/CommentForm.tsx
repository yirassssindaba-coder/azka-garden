import React, { useState } from 'react';
import './CommentForm.css';

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h4>Tulis Ulasan Anda</h4>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Bagikan pengalaman Anda dengan produk kami..."
        className="comment-textarea"
        rows={4}
        maxLength={500}
      />
      <div className="form-footer">
        <span className="character-count">{content.length}/500</span>
        <button 
          type="submit" 
          disabled={!content.trim()}
          className="submit-button"
        >
          Kirim Ulasan
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
