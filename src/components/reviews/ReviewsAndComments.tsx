import React, { useState, useEffect } from 'react';
import { Star, Heart, MessageCircle, Send, ThumbsUp, Reply, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userRole: 'customer' | 'admin' | 'developer';
  rating: number;
  comment: string;
  likes: string[];
  replies: ReviewReply[];
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewReply {
  id: string;
  userId: string;
  userName: string;
  userRole: 'customer' | 'admin' | 'developer';
  comment: string;
  likes: string[];
  createdAt: Date;
}

const ReviewsAndComments: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyComment, setReplyComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadReviews();
    
    // Real-time updates - check for new reviews every 3 seconds
    const interval = setInterval(loadReviews, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadReviews = () => {
    const savedReviews = localStorage.getItem('global-reviews');
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews).map((review: any) => ({
          ...review,
          createdAt: new Date(review.createdAt),
          updatedAt: new Date(review.updatedAt),
          replies: review.replies.map((reply: any) => ({
            ...reply,
            createdAt: new Date(reply.createdAt)
          }))
        }));
        setReviews(parsedReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
      }
    } else {
      // Initialize with demo reviews
      const demoReviews: Review[] = [
        {
          id: 'review-1',
          userId: 'customer-001',
          userName: 'Sari Dewi',
          userRole: 'customer',
          rating: 5,
          comment: 'Pelayanan Azka Garden sangat memuaskan! Tanaman yang saya beli sehat dan packaging rapi. Terima kasih!',
          likes: [],
          replies: [
            {
              id: 'reply-1',
              userId: 'admin-1',
              userName: 'Admin Azka Garden',
              userRole: 'admin',
              comment: 'Terima kasih atas review positifnya! Kami senang tanaman Anda tumbuh dengan baik. Jangan lupa ikuti tips perawatan di channel YouTube kami.',
              likes: [],
              createdAt: new Date(Date.now() - 43200000)
            }
          ],
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 86400000)
        },
        {
          id: 'review-2',
          userId: 'customer-002',
          userName: 'Budi Santoso',
          userRole: 'customer',
          rating: 4,
          comment: 'Koleksi tanaman lengkap dan harga terjangkau. Recommended untuk pecinta tanaman hias!',
          likes: [],
          replies: [
            {
              id: 'reply-2',
              userId: 'admin-1',
              userName: 'Admin Azka Garden',
              userRole: 'admin',
              comment: 'Terima kasih atas kepercayaannya! Kami akan terus memberikan yang terbaik untuk semua pecinta tanaman.',
              likes: [],
              createdAt: new Date(Date.now() - 21600000)
            }
          ],
          createdAt: new Date(Date.now() - 172800000),
          updatedAt: new Date(Date.now() - 172800000)
        },
        {
          id: 'review-3',
          userId: 'customer-003',
          userName: 'Rina Pratiwi',
          userRole: 'customer',
          rating: 5,
          comment: 'Monstera yang saya beli dari Azka Garden tumbuh sangat subur! Packaging juga sangat aman. Pasti akan order lagi.',
          likes: ['customer-001'],
          replies: [],
          createdAt: new Date(Date.now() - 259200000),
          updatedAt: new Date(Date.now() - 259200000)
        }
      ];
      setReviews(demoReviews);
      localStorage.setItem('global-reviews', JSON.stringify(demoReviews));
    }
  };

  const saveReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('global-reviews', JSON.stringify(updatedReviews));
    
    // Trigger update event for cross-device sync
    window.dispatchEvent(new CustomEvent('reviewsUpdated', { detail: updatedReviews }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Silakan login terlebih dahulu');
      return;
    }

    const newReviewData: Review = {
      id: 'review-' + Date.now(),
      userId: user.id,
      userName: user.fullName || user.email,
      userRole: user.role.toLowerCase() as 'customer' | 'admin' | 'developer',
      rating: newReview.rating,
      comment: newReview.comment,
      likes: [],
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedReviews = [newReviewData, ...reviews];
    saveReviews(updatedReviews);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleSubmitReply = async (reviewId: string) => {
    if (!user || !replyComment.trim()) return;

    const newReply: ReviewReply = {
      id: 'reply-' + Date.now(),
      userId: user.id,
      userName: user.fullName || user.email,
      userRole: user.role.toLowerCase() as 'customer' | 'admin' | 'developer',
      comment: replyComment,
      likes: [],
      createdAt: new Date()
    };

    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? {
            ...review,
            replies: [...review.replies, newReply],
            updatedAt: new Date()
          }
        : review
    );

    saveReviews(updatedReviews);
    setReplyComment('');
    setReplyTo(null);
  };

  const handleLikeReview = (reviewId: string) => {
    if (!user) return;

    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? {
            ...review,
            likes: review.likes.includes(user.id)
              ? review.likes.filter(id => id !== user.id)
              : [...review.likes, user.id],
            updatedAt: new Date()
          }
        : review
    );

    saveReviews(updatedReviews);
  };

  const handleLikeReply = (reviewId: string, replyId: string) => {
    if (!user) return;

    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? {
            ...review,
            replies: review.replies.map(reply =>
              reply.id === replyId
                ? {
                    ...reply,
                    likes: reply.likes.includes(user.id)
                      ? reply.likes.filter(id => id !== user.id)
                      : [...reply.likes, user.id]
                  }
                : reply
            ),
            updatedAt: new Date()
          }
        : review
    );

    saveReviews(updatedReviews);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!user) return;
    
    const review = reviews.find(r => r.id === reviewId);
    if (!review || (review.userId !== user.id && user.role !== 'ADMIN')) return;

    if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
      const updatedReviews = reviews.filter(r => r.id !== reviewId);
      saveReviews(updatedReviews);
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
      case 'admin': return 'Administrator';
      case 'developer': return 'Pengembang';
      default: return 'Pelanggan';
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MessageCircle className="h-16 w-16 text-green-200 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4 mobile-text-sm">Ulasan & Komentar Global Azka Garden</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mobile-text-xs">
              Bagikan pengalaman Anda dan baca testimoni dari pelanggan lain
            </p>
            <div className="mt-6 bg-white bg-opacity-20 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Globe className="h-5 w-5 text-green-200" />
                <span className="text-green-100 font-medium mobile-text-xs">
                  Ulasan terlihat di semua perangkat secara real-time
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mobile-padding">
        {/* Review Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 mobile-card mobile-p-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 mobile-text-sm">Ulasan & Komentar Global</h2>
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
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{averageRating.toFixed(1)}</span>
            <span className="text-gray-600">({reviews.length} ulasan global)</span>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-green-600" />
              <span className="text-green-800 text-sm font-medium mobile-text-xs">
                Semua ulasan tersinkron real-time di seluruh perangkat dan akun
              </span>
            </div>
          </div>
        </div>

        {/* Add Review Form */}
        {user && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 mobile-card mobile-p-3">
            <h3 className="text-lg font-bold text-gray-900 mb-4 mobile-text-sm">Tulis Ulasan Global</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 mobile-text-xs">
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
                <label className="block text-sm font-medium text-gray-700 mb-2 mobile-text-xs">
                  Komentar
                </label>
                <textarea
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mobile-form-input"
                  placeholder="Bagikan pengalaman Anda dengan Azka Garden..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors mobile-btn"
              >
                Kirim Ulasan
              </button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mobile-card mobile-p-3">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 mobile-text-sm">{review.userName}</span>
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
                      <span className="text-sm text-gray-600 mobile-text-xs">
                        {review.createdAt.toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
                
                {(user?.id === review.userId || user?.role === 'ADMIN') && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed break-words">{review.comment}</p>
              <p className="text-gray-700 mb-4 leading-relaxed break-words mobile-text-xs">{review.comment}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleLikeReview(review.id)}
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
                    <Reply className="h-4 w-4" />
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
                        {(user.fullName || user.email).charAt(0)}
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
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 break-words">{reply.comment}</p>
                      <button
                        onClick={() => handleLikeReply(review.id, reply.id)}
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
              <p>Belum ada ulasan</p>
              <p className="text-sm">Jadilah yang pertama memberikan ulasan!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndComments;