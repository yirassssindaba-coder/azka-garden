<div align="center">

# 🌿 Azka Garden
### *Plant Store Website with Database Integration*

![Plant Store](https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop)

*Website e-commerce modern untuk toko tanaman hias dengan interface berbahasa Indonesia*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🔐 **Admin & Developer Access**

### **Administrator Login**
```
URL: /admin/login
Email: admin@azkagarden.com
Password: Admin123!
```

**Fitur Admin:**
- 📊 Dashboard analytics dengan real-time metrics
- 👥 User management dan customer insights
- 📦 Product management (59+ tanaman dari daftar)
- 🛒 Order management dan tracking
- 💳 Payment monitoring dan refunds
- 🚚 Shipping management dan logistics
- 📈 Sales reports dan business intelligence
- 🎯 Marketing campaigns dan promotions

### **Developer Login**
```
URL: /admin/login (pilih Developer)
Email: dev@azkagarden.com
Password: Dev123!
```

**Fitur Developer:**
- 🖥️ System health monitoring
- 🐛 Error tracking dan debugging tools
- 📡 API endpoint monitoring
- 🔧 Quick fix tools untuk troubleshooting
- 📊 Performance metrics real-time
- 🛡️ Security monitoring
- 🔄 Cache management
- 🚀 Deployment tools

---

## 📋 **Deskripsi Proyek**

**Azka Garden** adalah aplikasi e-commerce modern yang dirancang khusus untuk pasar Indonesia, focusing pada penjualan tanaman hias dengan user experience yang intuitif dan fitur-fitur lengkap untuk transaksi online yang aman dan nyaman.

### 🎯 **Target Market**
- 🇮🇩 **Pasar Indonesia** dengan lokalisasi lengkap
- 💰 **Mata Uang Rupiah (IDR)** dengan format Indonesia
- 🌐 **Interface Bahasa Indonesia** yang user-friendly

---

## 🚀 **Tech Stack**

### **Frontend Core**
```typescript
🔧 React 18+ dengan TypeScript/TSX
⚡ Vite untuk build tool & development server  
🎨 Tailwind CSS untuk styling modern
🧭 React Router untuk SPA routing
🎯 ESLint untuk code quality
🎨 Lucide React untuk icon library
```

### **State Management**
```typescript
🗄️ React Context API (CartContext, OrderContext)
🔄 useReducer untuk complex state logic
💾 Local Storage untuk persistence
📱 Real-time state synchronization
```

### **Backend Integration**
```typescript
📊 Mock Data System (Development)
🔄 Simulated API calls dengan async/await
📁 Structured data dalam src/services/database.ts
🔮 Ready untuk Supabase/Firebase integration
```

---

## 🏗️ **Arsitektur Aplikasi**

### **Struktur Routing**
```typescript
🏠 /                    → Halaman utama & hero section
🛍️ /products            → Katalog produk tanaman
🔍 /products/:id        → Detail produk individual  
🛒 /cart               → Keranjang belanja
💳 /checkout           → Proses checkout & pembayaran
📦 /orders             → Riwayat pesanan user
📋 /orders/:id         → Detail pesanan spesifik
```

### **Data Structure**
```typescript
interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  height: string;
  care_level: string;
  watering_frequency: string;
  care_instructions: string;
  stock: number;
}

interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentMethod: PaymentMethod;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}
```

---

## ✨ **Fitur Unggulan**

### 🛍️ **E-Commerce Features**
- **📱 Responsive Design** - Optimal di semua device
- **🔍 Product Catalog** - Grid layout dengan filter & search
- **📝 Detail Produk** - Info lengkap perawatan tanaman
- **🛒 Shopping Cart** - Real-time quantity management
- **💳 Multi Payment** - Bank Transfer, E-wallet, COD
- **🚚 Shipping Options** - Multiple courier dengan estimasi
- **📦 Order Tracking** - Real-time status updates

### 💰 **Payment System**
```typescript
💳 Stripe Integration (Credit/Debit Cards)
🏦 Bank Transfer (BCA, Mandiri, BNI)
📱 E-wallet (GoPay, OVO, DANA) 
🚚 Cash on Delivery (COD)
🔄 Subscription Management (Recurring Payments)
🧾 Pajak PPN 11% otomatis
🎫 Sistem diskon dengan kode promo
💸 Fee payment transparan
🔒 PCI DSS Compliant Security
```

### 🌱 **Plant-Specific Features**
- **📊 Care Level** - Easy, Medium, Hard classification
- **💧 Watering Schedule** - Frekuensi penyiraman optimal
- **📏 Size Information** - Tinggi tanaman dewasa
- **📝 Care Instructions** - Panduan perawatan detail
- **📦 Stock Management** - Real-time inventory

---

## 🛠️ **Installation & Setup**

### **Prerequisites**
```bash
Node.js 18+ 
npm atau yarn
Git
```

### **Quick Start**
```bash
# Clone repository
git clone https://github.com/redeemself/azka-garden.git

# Navigate to project
cd azka-garden

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Development Scripts**
```json
{
  "dev": "vite",
  "build": "tsc && vite build", 
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

---

## 📊 **Project Status**

### **Current State: Prototype/Demo** 
```typescript
✅ Frontend Implementation Complete
✅ UI/UX Design Modern & Responsive  
✅ Shopping Flow Fully Functional
✅ Mock Data Integration
⚠️ Backend Integration Required
⚠️ Payment Gateway Integration Needed
⚠️ Real Database Connection Pending
```

### **Ready for Production Upgrade**
- 🔄 **Supabase Integration** - PostgreSQL backend
- 🔐 **Authentication System** - User registration/login
- 💳 **Payment Gateway** - Midtrans/Xendit integration  
- 📧 **Email Notifications** - Order confirmations
- 📱 **Admin Dashboard** - Inventory management

---

## 🎨 **UI/UX Highlights**

### **Design Philosophy**
- 🌿 **Nature-Inspired** color palette
- 📱 **Mobile-First** responsive design
- ⚡ **Performance-Optimized** loading
- 🎯 **User-Centric** navigation flow

### **Key UI Components**
```typescript
🎴 Hero Section dengan call-to-action
🃏 Product Cards dengan hover effects
🛒 Shopping Cart dengan quantity controls  
💳 Checkout Form dengan validation
📊 Order Summary dengan tax calculation
📱 Mobile-optimized touch interfaces
```

---

## 🔮 **Future Enhancements**

### **Phase 1: Backend Integration**
- [ ] Supabase/Firebase database setup
- [ ] Real-time inventory management
- [ ] User authentication system
- [ ] Order management dashboard
- [x] **Stripe Payment Integration** - Secure payment processing
- [x] **Subscription Management** - Recurring payments for premium products
- [x] **Webhook Handling** - Real-time payment status updates

### **Phase 2: Advanced Features** 
- [x] **Payment gateway integration** - Stripe integration complete
- [ ] Email notification system
- [ ] Advanced search & filters
- [ ] Wishlist functionality
- [ ] Review & rating system
- [x] **Secure Checkout Flow** - Multi-step payment process
- [x] **Order Tracking** - Real-time order status updates

### **Phase 3: Scale & Optimize**
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Analytics integration
- [ ] Mobile app development

---

## 👥 **Contributing**

Kami menerima kontribusi dari developer yang ingin membantu mengembangkan Azka Garden!

### **How to Contribute**
```bash
1. Fork repository ini
2. Buat feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add some AmazingFeature')
4. Push ke branch (git push origin feature/AmazingFeature)  
5. Buka Pull Request
```

---

## 📄 **License**

Project ini menggunakan **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

<div align="center">

### 🌟 **Built with ❤️ for Plant Lovers**

*Transforming the way Indonesia shops for plants*

**[🚀 View Live Demo](https://azka-garden.vercel.app)** • **[📖 Documentation](https://github.com/redeemself/azka-garden/wiki)** • **[🐛 Report Bug](https://github.com/redeemself/azka-garden/issues)**

---

*Made by [redeemself](https://github.com/redeemself) with 🌱*

</div>
