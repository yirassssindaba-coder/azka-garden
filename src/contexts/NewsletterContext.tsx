import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NewsletterContextType {
  isSubscribed: boolean;
  subscriberEmail: string | null;
  subscribe: (email: string, name?: string) => Promise<void>;
  unsubscribe: () => void;
  checkSubscription: (email: string) => boolean;
}

const NewsletterContext = createContext<NewsletterContextType | null>(null);

export const NewsletterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already subscribed
    const savedSubscription = localStorage.getItem('azka_newsletter_subscription');
    if (savedSubscription) {
      try {
        const subscription = JSON.parse(savedSubscription);
        setIsSubscribed(true);
        setSubscriberEmail(subscription.email);
      } catch (error) {
        console.error('Error loading newsletter subscription:', error);
      }
    }
  }, []);

  const subscribe = async (email: string, name?: string) => {
    try {
      const subscription = {
        email,
        name,
        subscribedAt: new Date().toISOString(),
        isActive: true
      };

      localStorage.setItem('azka_newsletter_subscription', JSON.stringify(subscription));
      
      // Also save to global subscribers list
      const allSubscribers = JSON.parse(localStorage.getItem('azka_all_subscribers') || '[]');
      const existingIndex = allSubscribers.findIndex((sub: any) => sub.email === email);
      
      if (existingIndex >= 0) {
        allSubscribers[existingIndex] = subscription;
      } else {
        allSubscribers.push(subscription);
      }
      
      localStorage.setItem('azka_all_subscribers', JSON.stringify(allSubscribers));
      
      setIsSubscribed(true);
      setSubscriberEmail(email);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  };

  const unsubscribe = () => {
    localStorage.removeItem('azka_newsletter_subscription');
    setIsSubscribed(false);
    setSubscriberEmail(null);
  };

  const checkSubscription = (email: string): boolean => {
    const allSubscribers = JSON.parse(localStorage.getItem('azka_all_subscribers') || '[]');
    return allSubscribers.some((sub: any) => sub.email === email && sub.isActive);
  };

  return (
    <NewsletterContext.Provider value={{
      isSubscribed,
      subscriberEmail,
      subscribe,
      unsubscribe,
      checkSubscription
    }}>
      {children}
    </NewsletterContext.Provider>
  );
};

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
};