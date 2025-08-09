<div align="center">

# 🌿 Azka Garden
### *Plant Store Website with Database & Payment Integration*

![Plant Store](https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop)

*Website e-commerce modern untuk toko tanaman hias dengan interface berbahasa Indonesia*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

</div>

---

## ⚠️ Catatan Transparansi

Ringkasan di bawah mencakup VISI penuh platform (portal Admin/Developer, chat real-time, ulasan, dsb). Sebagian fitur **BELUM sepenuhnya ada dalam kode publik ini** saat ini. Bagian “Status Implementasi” menandai apa yang sudah tersedia di repository (✅) dan apa yang masih berupa rencana / draft (🕒 / ❌).  
Kontribusi untuk melengkapi gap sangat diterima.

---

## 🔐 Admin & Developer Access (Visi / Rencana)

Portal terpisah direncanakan untuk peran berbeda.

### Administrator Login (Demo Credentials – JANGAN gunakan di production)
```
URL: /admin/login
Email: admin@azkagarden.com
Password: Admin123!
Passkey (opsional konsep): AZKA2024ADMIN
```

**Fitur Admin (Roadmap / Partial):**
- 📊 Dashboard analytics (🕒)
- 👥 User & customer insights (🕒)
- 📦 Product management (Mock saat ini)
- 🛒 Order management & tracking (Stripe order view partial)
- 💳 Payment monitoring (Stripe status via views)
- 🚚 Shipping management (❌)
- 📈 Sales reports (❌)
- 🎯 Marketing campaigns (❌)

### Developer Login (Demo Credentials – Konsep)
```
URL: /developer/login (atau /admin/login → pilih Developer)
Email: dev@azkagarden.com
Password: Dev123!
Passkey: AZKA2024DEV
```

**Fitur Developer (Roadmap):**
- 🖥️ System health monitoring (❌)
- 🐛 Error tracking (❌)
- 📡 API endpoint monitoring (❌)
- 🔧 Quick fix tools (❌)
- 📊 Performance metrics (❌)
- 🛡️ Security monitoring (❌)
- 🔄 Cache management (❌)
- 🚀 Deployment tools (❌)

> Implementasi peran akan membutuhkan: tabel user_profiles / metadata Supabase + RLS + guards routing.

---

## 📋 Deskripsi Proyek

**Azka Garden** adalah aplikasi e-commerce tanaman hias berfokus pada pasar Indonesia dengan pengalaman belanja modern, siap dikembangkan ke backend real-time menggunakan Supabase + integrasi Stripe untuk pembayaran & subscription.

### 🎯 Target Market
- 🇮🇩 Lokal Indonesia (lokalisasi Bahasa)
- 💰 Format Rupiah (IDR)
- 🌐 UX sederhana & familiar

---

## 🚀 Tech Stack

### Frontend
```text
React 18 + TypeScript
Vite (fast dev & build)
Tailwind CSS (utility-first design)
React Router (SPA navigation)
Lucide React (ikon)
ESLint (code quality)
```

### Backend / Infrastruktur (Current & Planned)
```text
Supabase (Postgres + Auth + Edge Functions) – Stripe schema & functions sudah ada
Stripe (Checkout, Webhook, Subscriptions)
(Planned) Midtrans / Xendit (lokal gateway)
(Planned) Email service (Resend / Mailgun)
(Planned) Realtime channels untuk chat & update inventory
```

### State & Data Layer
```text
React Context + useReducer (cart / order flow)
LocalStorage fallback
Supabase client (src/lib/supabase.ts)
Stripe Service Abstraction (src/services/stripe.ts)
```

---

## 🏗️ Arsitektur (High-Level)

```
frontend (React + Vite)
  ├─ components / pages (UI modular)
  ├─ contexts (Cart / Stripe / Auth planned)
  ├─ services
  │    ├─ stripe.ts (checkout / subscription fetch)
  │    └─ (planned) inventory, chat, reviews
  ├─ lib
  │    └─ supabase.ts (client init)
  └─ stripe-config (price map / product mapping)

supabase/
  ├─ migrations (stripe_* tables, views, RLS)
  └─ functions
       ├─ stripe-checkout (Edge Function: create session, map customer)
       └─ stripe-webhook (Edge Function: event sync → tables)
```

---

## 🗄️ Skema Basis Data (Saat Ini – Stripe Focus)

Migrasi tersedia: `supabase/migrations/*_winter_band.sql`  
Membuat tabel & enum:

```
stripe_customers (map user → stripe customer_id)
stripe_subscriptions (status & periode subscription)
stripe_orders (one-time payments)
Views:
  stripe_user_subscriptions (filtered by auth user)
  stripe_user_orders (filtered by auth user)
RLS Policies sudah diterapkan (SELECT only for owning user).
```

> Perlu ditambahkan (Roadmap): products, inventory, reviews, chat_messages, user_profiles, roles.

---

## 📦 Struktur Data (Contoh / Mock)

```ts
interface Plant {
  id: string;
  name: string;
  description: string;
  price: number;          // stored in smallest currency unit (planned) / now plain
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

## ✨ Fitur (Visi vs Implementasi)

| Domain | Fitur | Status |
|--------|-------|--------|
| UI/UX | Responsive layout, hero, catalog, cart | ✅ |
| Produk | Detail tanaman (mock) | ✅ (mock) |
| Keranjang | Add/remove/update quantity | ✅ |
| Checkout | Alur basic + stub | ✅ (frontend) |
| Pembayaran | Stripe Checkout + Webhook + subscription schema | ✅ (backend partial) |
| Subscription | Schema + sync event | ✅ (basic) |
| Auth | Supabase client ready, form UI belum | 🕒 |
| Portal Admin/Dev | Routing & guard | ❌ |
| Chat Realtime | Belum ada tabel & channel | ❌ |
| Reviews & Rating | Belum ada | ❌ |
| Inventory realtime | Belum ada | ❌ |
| Email notifikasi | Belum ada | ❌ |
| Shipment tracking | Belum | ❌ |
| Analytics / Reports | Belum | ❌ |
| Security Hardening | RLS stripe_* done | 🕒 (perlu perluasan) |

Legenda: ✅ = tersedia, 🕒 = partial / planned, ❌ = belum.

---

## 💳 Pembayaran & Subscription (Implemented Scope)

- Stripe Edge Function `stripe-checkout`:  
  - Buat customer mapping otomatis jika belum ada.  
  - Insert subscription placeholder row (status: not_started) jika mode subscription.  
- Stripe Webhook `stripe-webhook`:  
  - Mendengarkan event & sinkronisasi (partial logic).  
  - Mencatat order one-time (stripe_orders) setelah session sukses.  
- Views: `stripe_user_orders`, `stripe_user_subscriptions` untuk akses aman di frontend.

> Catatan: Validasi tambahan, penanganan error lanjutan, refund flow, proration, belum tersedia.

---

## 🌱 Health & Care (Planned Domain-Specific Enhancements)

Rencana menambah modul perawatan:
- Scheduling penyiraman (reminder)
- Penilaian tingkat kesulitan (filter)
- Pengetahuan perawatan (dynamic knowledge base)

---

## 🛠️ Installation & Setup

### Prasyarat
```
Node.js 18+
npm atau yarn
Git
Supabase CLI (untuk deploy backend)
Stripe Account (test keys)
```

### Quick Start (Frontend Dev Mode)
```bash
git clone https://github.com/redeemself/azka-garden.git
cd azka-garden
npm install
cp .env.example .env   # isi variabel
npm run dev
```

### Environment Variables (.env)
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
# Jangan expose service role di browser production
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key (gunakan hanya di Edge Functions)

# Optional Integrations
VITE_MIDTRANS_CLIENT_KEY=...
VITE_GOOGLE_ANALYTICS_ID=...
```

### Supabase Backend Setup
```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
# Deploy functions
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook
# Set secrets
supabase functions secrets set \
  STRIPE_SECRET_KEY=sk_test_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  SUPABASE_SERVICE_ROLE_KEY=service_role_key \
  SUPABASE_URL=https://<project>.supabase.co
```

### Development Scripts
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

---

## 🔐 Keamanan (Best Practices)

| Point | Rekomendasi |
|-------|-------------|
| Service Role Key | Jangan pernah diekspos di client bundler. Pindahkan logika sensitif ke Edge Functions. |
| RLS | Tambahkan RLS ke tabel non-Stripe (products, reviews) saat dibuat. |
| Validasi Harga | Whitelist price_id di server (stripe-checkout function). |
| Logging | Hindari log data sensitif (email lengkap / token). |
| Credential Demo | Putar / ubah password bila portal real dirilis. |

---

## 🧪 Testing Checklist

| Area | Tes |
|------|-----|
| Stripe Checkout | Buat session → redirect → payment success → webhook insert orders |
| Subscription | Checkout subscription → update status via webhook |
| RLS | Query stripe_user_orders sebagai user lain (harus kosong) |
| Performance | Lighthouse audit (Core Web Vitals) |
| Lint | npm run lint |

---

## 🔮 Roadmap Terstruktur

### Phase 1: Backend Integration
- [x] Stripe schema & Edge Functions
- [ ] Products & inventory tables
- [ ] Auth UI + role metadata
- [ ] Order management dashboard
- [ ] Reviews & Rating (schema + UI)
- [ ] Chat real-time (channels)

### Phase 2: Advanced Commerce
- [ ] Email notifications
- [ ] Advanced search & filtering
- [ ] Wishlist & personalization
- [ ] Shipping & logistics integration
- [ ] Discount / promo engine

### Phase 3: Scale & Optimize
- [ ] Performance & bundle splitting
- [ ] SEO & metadata dynamic
- [ ] Analytics (PostHog / GA)
- [ ] Mobile PWA / App wrapper
- [ ] Observability (Sentry / Logflare)

---

## 🧩 Kontribusi

Kami menerima kontribusi!

```bash
1. Fork repository
2. git checkout -b feature/AmazingFeature
3. Commit (git commit -m 'feat: add AmazingFeature')
4. Push (git push origin feature/AmazingFeature)
5. Buka Pull Request
```

### Issue Ideas
- Tambah tabel products + RLS
- Implement auth UI (login/register/reset)
- Reviews module
- Chat real-time (Supabase Realtime channel)
- Admin dashboard shell (layout + navigation)
- Refactor Stripe error handling

---

## 🗂️ Struktur Direktori (Ringkas)

```
src/
  components/
  pages/
  contexts/
  services/
    stripe.ts
  lib/
    supabase.ts
  stripe-config.ts
supabase/
  functions/
    stripe-checkout/
    stripe-webhook/
  migrations/
.env.example
package.json
```

---

## 📄 License

MIT License – lihat file [LICENSE](LICENSE).

---

## 🌐 Deployment

| Jenis | URL |
|-------|-----|
| Demo (contoh) | https://azka-garden.vercel.app |
| (Alternatif / Netlify) | (Jika ada) |

> Pastikan environment Vercel / Netlify diisi dengan variabel Supabase & Stripe.

---

## 📞 Status dan Bantuan

Jika Anda menemukan ketidaksesuaian antara README dan kode, silakan buka issue dengan label: `documentation` atau `discrepancy`.

---

<div align="center">

### 🌟 Built with ❤️ for Plant Lovers
*Transforming the way Indonesia shops for plants*

**[🚀 Live Demo](https://azka-garden.vercel.app)** • **[📖 Wiki](https://github.com/redeemself/azka-garden/wiki)** • **[🐛 Report Bug](https://github.com/redeemself/azka-garden/issues)**

<br/>

_Made by [redeemself](https://github.com/redeemself) with 🌱_

</div>
