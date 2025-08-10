import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userRole: 'customer' | 'admin' | 'developer';
  rating: number;
  comment: string;
  images?: string[];
  likes: string[]; // Array of user IDs who liked
  replies: ReviewReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewReply {
  id: string;
  userId: string;
  userName: string;
  userRole: 'customer' | 'admin' | 'developer';
  comment: string;
  likes: string[];
  createdAt: Date;
}

interface ReviewContextType {
  reviews: Review[];
  getProductReviews: (productId: string) => Review[];
  addReview: (productId: string, rating: number, comment: string, images?: string[]) => Promise<void>;
  addReply: (reviewId: string, comment: string) => Promise<void>;
  likeReview: (reviewId: string) => Promise<void>;
  likeReply: (reviewId: string, replyId: string) => Promise<void>;
  getAverageRating: (productId: string) => number;
  getReviewCount: (productId: string) => number;
}

const ReviewContext = createContext<ReviewContextType | null>(null);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem('product-reviews');
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
      // Initialize with some demo reviews
      const demoReviews: Review[] = [
        {
          id: 'review-1',
          productId: '1',
          userId: 'user-demo',
          userName: 'Sari Dewi',
          userRole: 'customer',
          rating: 5,
          comment: 'Jamani Dolar yang saya beli sangat sehat dan packaging-nya rapi. Sudah 2 bulan tumbuh dengan baik!',
          likes: ['user-1', 'admin-1'],
          replies: [
            {
              id: 'reply-1',
              userId: 'admin-1',
              userName: 'Admin Azka Garden',
              userRole: 'admin',
              comment: 'Terima kasih atas review positifnya! Kami senang tanaman Anda tumbuh dengan baik. Jangan lupa ikuti tips perawatan di channel YouTube kami.',
              likes: ['user-demo'],
              createdAt: new Date(Date.now() - 86400000)
            }
          ],
          createdAt: new Date(Date.now() - 172800000),
          updatedAt: new Date(Date.now() - 172800000)
        },
        {
          id: 'review-2',
          productId: '2',
          userId: 'user-demo2',
          userName: 'Rizki Pratama',
          userRole: 'customer',
          rating: 4,
          comment: 'Monstera Deliciosa-nya bagus, tapi ada sedikit kerusakan pada daun saat sampai. Overall puas dengan pelayanannya.',
          likes: ['user-1'],
          replies: [
            {
              id: 'reply-2',
              userId: 'admin-1',
              userName: 'Admin Azka Garden',
              userRole: 'admin',
              comment: 'Mohon maaf atas ketidaknyamanan tersebut. Kerusakan kecil pada daun saat pengiriman adalah hal yang wajar dan akan pulih dengan sendirinya. Terima kasih atas feedback-nya!',
              likes: [],
              createdAt: new Date(Date.now() - 43200000)
            }
          ],
          createdAt: new Date(Date.now() - 259200000),
          updatedAt: new Date(Date.now() - 259200000)
        }
      ];
      setReviews(demoReviews);
    }
  }, []);

  useEffect(() => {
    // Save reviews to localStorage
    if (reviews.length > 0) {
      localStorage.setItem('product-reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const getProductReviews = (productId: string): Review[] => {
    return reviews.filter(review => review.productId === productId);
  };

  const addReview = async (productId: string, rating: number, comment: string, images?: string[]) => {
    if (!user) throw new Error('User must be authenticated');

    const newReview: Review = {
      id: 'review-' + Date.now(),
      productId,
      userId: user.id,
      userName: user.fullName,
      userRole: user.role,
      rating,
      comment,
      images,
      likes: [],
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setReviews(prev => [newReview, ...prev]);
  };

  const addReply = async (reviewId: string, comment: string) => {
    if (!user) throw new Error('User must be authenticated');

    const newReply: ReviewReply = {
      id: 'reply-' + Date.now(),
      userId: user.id,
      userName: user.fullName,
      userRole: user.role,
      comment,
      likes: [],
      createdAt: new Date()
    };

    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? {
            ...review,
            replies: [...review.replies, newReply],
            updatedAt: new Date()
          }
        : review
    ));
  };

  const likeReview = async (reviewId: string) => {
    if (!user) return;

    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? {
            ...review,
            likes: review.likes.includes(user.id)
              ? review.likes.filter(id => id !== user.id)
              : [...review.likes, user.id],
            updatedAt: new Date()
          }
        : review
    ));
  };

  const likeReply = async (reviewId: string, replyId: string) => {
    if (!user) return;

    setReviews(prev => prev.map(review =>
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
    ));
  };

  const getAverageRating = (productId: string): number => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / productReviews.length) * 10) / 10;
  };

  const getReviewCount = (productId: string): number => {
    return getProductReviews(productId).length;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      getProductReviews,
      addReview,
      addReply,
      likeReview,
      likeReply,
      getAverageRating,
      getReviewCount
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};