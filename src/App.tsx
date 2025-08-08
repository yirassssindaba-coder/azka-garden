import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <OrderProvider>
            <CartProvider>
              <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/shipping" element={<Shipping />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/care-guide" element={<CareGuide />} />
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
                      <Route path="/admin" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin/dashboard" element={
                        <ProtectedRoute requiredRole="admin">
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      
                      {/* Developer Routes */}
                      <Route path="/developer/login" element={<DeveloperLogin />} />
                      <Route path="/developer/portal" element={
                        <ProtectedRoute requiredRole="developer">
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;