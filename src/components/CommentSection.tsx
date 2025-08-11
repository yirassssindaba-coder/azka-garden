import React, { useState } from 'react';
import { Comment as CommentType } from '../types/comment';
import Comment from './Comment';
import CommentForm from './CommentForm';
import './CommentSection.css';

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: '1',
      user: {
        id: '1',
        name: 'Sari Dewi',
        role: 'Pelanggan'
      },
      content: 'Pelayanan Azka Garden sangat memuaskan! Tanaman yang saya beli sehat dan packaging rapi. Terima kasih!',
      date: '10/8/2025',
      likes: 0,
      isLiked: false,
      replies: [
        {
          id: '1-1',
          user: {
            id: 'admin',
            name: 'Admin Azka Garden',
            role: 'Administrator'
          },
          content: 'Terima kasih atas review positifnya! Kami senang tanaman Anda tumbuh dengan baik. Jangan lupa ikuti tips perawatan di channel YouTube kami.',
          date: '10/8/2025',
          likes: 0,
          isLiked: false
        }
      ]
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Budi Santoso',
        role: 'Pelanggan'
      },
      content: 'Koleksi tanaman lengkap dan harga terjangkau. Recommended untuk pecinta tanaman hias!',
      date: '9/8/2025',
      likes: 0,
      isLiked: false,
      replies: [
        {
          id: '2-1',
          user: {
            id: 'admin',
            name: 'Admin Azka Garden',
            role: 'Administrator'
          },
          content: 'Terima kasih atas kepercayaannya! Kami akan terus memberikan yang terbaik untuk semua pecinta tanaman.',
          date: '10/8/2025',
          likes: 0,
          isLiked: false
        }
      ]
    },
    {
      id: '3',
      user: {
        id: '3',
        name: 'Rina Pratiwi',
        role: 'Pelanggan'
      },
      content: 'Monstera yang saya beli dari Azka Garden tumbuh sangat subur! Packaging juga sangat aman. Pasti akan order lagi.',
      date: '8/8/2025',
      likes: 1,
      isLiked: false,
      replies: []
    }
  ]);

  const handleLike = (commentId: string, replyId?: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId && !replyId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        
        if (comment.id === commentId && replyId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        }
        
        return comment;
      })
    );
  };

  const handleAddComment = (content: string) => {
    const newComment: CommentType = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        name: 'User Baru',
        role: 'Pelanggan'
      },
      content,
      date: new Date().toLocaleDateString('id-ID'),
      likes: 0,
      isLiked: false,
      replies: []
    };
    
    setComments([newComment, ...comments]);
  };

  return (
    <div className="comment-section">
      <div className="comment-section-header">
        <h3>Ulasan Pelanggan</h3>
        <span className="comment-count">{comments.length} ulasan</span>
      </div>
      
      <CommentForm onSubmit={handleAddComment} />
      
      <div className="comments-list">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
