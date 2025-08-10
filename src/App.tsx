import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabaseHealthCheck } from './services/health';
import Header from './components/Header';
import Footer from './components/layout/Footer';
import ChatBot from './components/ai/ChatBot';
import SmartSearchBar from './components/advanced/SmartSearchBar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import AdminDashboard from './pages/admin/AdminDashboard';
import DeveloperLogin from './pages/developer/DeveloperLogin';
import DeveloperPortal from './pages/developer/DeveloperPortal';
import AdminLogin from './pages/admin/AdminLogin';
import DeveloperDashboard from './pages/admin/DeveloperDashboard';
import StripeProducts from './pages/StripeProducts';
import StripeSuccess from './pages/StripeSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import CareGuide from './pages/CareGuide';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import ReviewsAndComments from './components/reviews/ReviewsAndComments';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CustomerService from './pages/CustomerService';
import GlobalChatSystem from './components/chat/GlobalChatSystem';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ReviewProvider } from './contexts/ReviewContext';
import { NewsletterProvider } from './contexts/NewsletterContext';
import StripeProvider from './components/stripe/StripeProvider';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  useEffect(() => {
    // Initial health check
    const checkSupabaseConnection = async () => {
      try {
        const healthCheck = await supabaseHealthCheck();
        if (!healthCheck.ok) {
          if (healthCheck.demo) {
            console.log('Running in demo mode - Supabase not configured or unavailable');
          } else {
            console.warn('Supabase health check failed:', healthCheck);
            if (healthCheck.type === 'network') {
              console.error('Network connection to Supabase failed. Check URL and keys.');
            }
          }
        } else {
          console.log('Supabase connection healthy');
        }
      } catch (error) {
        console.log('Health check failed - continuing in demo mode:', error);
      }
    };
    
    checkSupabaseConnection();
  }, []);

  return (
    <ThemeProvider>
      <NewsletterProvider>
        <AuthProvider>
          <StripeProvider>
            <ReviewProvider>
              <ChatProvider>
                <OrderProvider>
                  <CartProvider>
                    <Router>
                      <div className="min-h-screen bg-white transition-colors">
                        <Header />
                        <main>
                          <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } />
                      <Route path="/orders" element={
                        <ProtectedRoute>
                          <Orders />
                        </ProtectedRoute>
                      } />
                      <Route path="/orders/:id" element={
                        <ProtectedRoute>
                          <OrderDetail />
                        </ProtectedRoute>
                      } />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/shipping" element={<Shipping />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/care-guide" element={<CareGuide />} />
                      <Route path="/reviews" element={<ReviewsAndComments />} />
                      <Route path="/customer-service" element={
                        <ProtectedRoute requiredRole="ADMIN">
                          <CustomerService />
                        </ProtectedRoute>
                      } />
                      <Route path="/global-chat" element={<GlobalChatSystem />} />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/wishlist" element={
                        <ProtectedRoute>
                          <Wishlist />
                        </ProtectedRoute>
                      } />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/careers" element={<Careers />} />
                      
                     {/* Stripe Routes */}
                     <Route path="/stripe-products" element={
                       <ProtectedRoute>
                         <StripeProducts />
                       </ProtectedRoute>
                     } />
                     <Route path="/success" element={
                       <ProtectedRoute>
                         <StripeSuccess />
                       </ProtectedRoute>
                     } />
                     
                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={
                        <ProtectedRoute requiredRole="ADMIN">
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      
                      {/* Developer Routes */}
                      <Route path="/developer/login" element={<DeveloperLogin />} />
                      <Route path="/developer/portal" element={
                        <ProtectedRoute requiredRole="DEVELOPER">
                          <DeveloperPortal />
                        </ProtectedRoute>
                      } />
                        </Routes>
                        </main>
                        <Footer />
                        <ChatBot />
                      </div>
                    </Router>
                  </CartProvider>
                </OrderProvider>
              </ChatProvider>
            </ReviewProvider>
          </StripeProvider>
        </AuthProvider>
      </NewsletterProvider>
    </ThemeProvider>
  );
}

export default App;