import React, { useState } from 'react';
import { Star, Heart, MessageCircle, Send, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useReviews } from '../../contexts/ReviewContext';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyComment, setReplyComment] = useState('');
  const { user } = useAuth();
  const { 
    getProductReviews, 
    addReview, 
    addReply, 
    likeReview, 
    likeReply, 
    getAverageRating, 
    getReviewCount 
  } = useReviews();

  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  const reviewCount = getReviewCount(productId);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    try {
      await addReview(productId, newReview.rating, newReview.comment);
      setNewReview({ rating: 5, comment: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleSubmitReply = async (reviewId: string) => {
    if (!user || !replyComment.trim()) return;

    try {
      await addReply(reviewId, replyComment);
      setReplyComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error adding reply:', error);
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
      case 'admin': return 'Admin';
      case 'developer': return 'Developer';
      default: return 'Customer';
    }
  };

  return (
    <div className="mt-8">
      {/* Review Summary */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${
                  i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{averageRating}</span>
          <span className="text-gray-600 dark:text-gray-400">({reviewCount} ulasan)</span>
        </div>
      </div>

      {/* Add Review Form */}
      {user && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tulis Ulasan</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Komentar
              </label>
              <textarea
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Bagikan pengalaman Anda dengan tanaman ini..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Kirim Ulasan
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    {review.userName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">{review.userName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(review.userRole)}`}>
                      {getRoleLabel(review.userRole)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {review.createdAt.toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => likeReview(review.id)}
                className={`flex items-center space-x-1 text-sm transition-colors ${
                  user && review.likes.includes(user.id)
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{review.likes.length}</span>
              </button>
              
              {user && (
                <button
                  onClick={() => setReplyTo(replyTo === review.id ? null : review.id)}
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Balas</span>
                </button>
              )}
            </div>

            {/* Reply Form */}
            {replyTo === review.id && user && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">
                      {user.fullName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      rows={3}
                      value={replyComment}
                      onChange={(e) => setReplyComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Tulis balasan Anda..."
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        onClick={() => setReplyTo(null)}
                        className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleSubmitReply(review.id)}
                        disabled={!replyComment.trim()}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Send className="h-3 w-3" />
                        <span>Kirim</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Replies */}
            {review.replies.length > 0 && (
              <div className="ml-8 space-y-4 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                {review.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 font-bold text-xs">
                          {reply.userName.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{reply.userName}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(reply.userRole)}`}>
                        {getRoleLabel(reply.userRole)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {reply.createdAt.toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{reply.comment}</p>
                    <button
                      onClick={() => likeReply(review.id, reply.id)}
                      className={`flex items-center space-x-1 text-xs transition-colors ${
                        user && reply.likes.includes(user.id)
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                      }`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{reply.likes.length}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {reviews.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Belum ada ulasan untuk produk ini</p>
            <p className="text-sm">Jadilah yang pertama memberikan ulasan!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;