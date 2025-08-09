<div align="center">

# 🌿 Azka Garden
### *Plant Store Website with Database, Payment & Multi-Portal Integration*

![Plant Store](https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800&h=200&fit=crop)

*Website e-commerce modern untuk toko tanaman hias – pengalaman terlokalisasi untuk pasar Indonesia.*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

</div>

---

## 🏗️ Ringkasan Lengkap (Klaim Fitur Platform)

| Domain | Status Klaim |
|--------|--------------|
| Portal Administrator & Developer terpisah | ✅ |
| Autentikasi lengkap (register, login, reset password, multi session) | ✅ |
| Chat real-time multi-portal (routing otomatis) | ✅ |
| Sistem ulasan & komentar global (rating + like + reply) | ✅ |
| Responsiveness sempurna (tanpa horizontal scroll) | ✅ |
| UI/UX (dark mode, efek bunga, kontras optimal) | ✅ |
| Data real-time & sinkron lintas perangkat | ✅ |
| Order status & sinkron antar portal | ✅ |
| Production-ready deployment | ✅ (Live demo) |

> Live Deployment: https://storied-pony-6862fe.netlify.app  
> (Jika beberapa fitur belum tampak di repo publik, berarti masih berada di branch privat / belum dipush.)

---

## ⚠️ Catatan Transparansi Repository

Repository publik saat ini fokus pada:
- Frontend e-commerce dasar (produk mock, cart, checkout flow)
- Integrasi Stripe (schema + Edge Functions + views)
- Struktur awal Supabase (migrasi tabel stripe_*)
- Belum ditemukan secara eksplisit di kode publik (per saat penulisan): portal admin/developer, modul chat, modul ulasan, auth UI, tabel roles/reviews/chat.

Jika Anda menambahkan fitur-fitur tersebut dari branch lain, harap:
1. Push migrasi tambahan (reviews, chat_messages, user_profiles, roles).
2. Tambahkan komponen UI & proteksi route.
3. Perbarui README lagi bila gap sudah tertutup.

---

## 🔐 Multi-Portal & Akses Peran

### Portal Administrator
```
URL: /admin/login
Demo Email: admin@azkagarden.com
Password: Admin123!
Passkey (opsional konsep): AZKA2024ADMIN
```

Fitur Admin (klaim):
- 📊 Real-time dashboard & metrics
- 👥 Manajemen pengguna / customer insights
- 📦 CRUD produk & stok
- 🛒 Manajemen & tracking pesanan
- 💳 Monitoring pembayaran + refund
- 🚚 Logistik & pengiriman
- 📈 Sales & growth analytics
- 🎯 Kampanye & promosi

### Portal Developer
```
URL: /developer/login (atau /admin/login → switch)
Demo Email: dev@azkagarden.com
Password: Dev123!
Passkey: AZKA2024DEV
```
Fitur Developer (klaim):
- 🖥️ Health & uptime monitoring
- 🐛 Error & log tracing
- 📡 API & endpoint monitoring
- 🔧 Quick maintenance tools
- 📊 Performance metrics real-time
- 🛡️ Security audits
- 🔄 Cache / invalidation tools
- 🚀 Deployment utilities

---

## 🔐 Sistem Autentikasi (Klaim)
✅ Persistent registration  
✅ Email/password validation  
✅ Reset password via token  
✅ Multi-device session continuity  

(Repo publik saat ini hanya menyiapkan klien Supabase—UI & flow lengkap perlu verifikasi / integrasi tambahan.)

---

## 💬 Chat System Real-time (Klaim)
- Auto-routing: pertanyaan teknis → Developer, umum → Admin
- Polling / real-time sync tiap 2 detik (atau channel realtime)
- Terintegrasi halaman Customer Service
- Tidak ada greeting otomatis (menunggu input pengguna)
- Multi-device conversation continuity

---

## ⭐ Sistem Ulasan & Komentar (Klaim)
- Global visibility & cross-device sync (3 detik)
- Rating bintang + like
- Admin & Developer dapat membalas
- Moderasi potensial via role

---

## 🎨 UI/UX & Effects (Klaim)
- Tanpa background hitam penuh, gunakan palet abu terang
- Kontras teks optimal
- Dark mode mendukung aksesibilitas
- Efek “bunga bertebaran” animatif halus
- Zero horizontal scroll, adaptive navigation & responsive tables

---

## 🔗 Real-time Data Integration (Klaim)
- Data live antar portal
- Status pesanan ter-update instan
- Persistensi lintas device
- Stripe webhook sinkronisasi order/subscription

---

## 📋 Deskripsi Inti Proyek

Azka Garden adalah platform e-commerce tanaman hias dengan integrasi pembayaran (Stripe) dan fondasi Supabase untuk mengembangkan multi-portal (Admin / Developer) serta modul interaksi (chat, ulasan, monitoring) ke depan.

---

## 🚀 Tech Stack

### Frontend
```
React 18 + TypeScript
Vite (dev/build)
Tailwind CSS
React Router
Lucide React (icons)
ESLint / Type Checking
```

### Backend / Infra
```
Supabase (Postgres, Auth, Edge Functions)
Stripe (Checkout + Webhook + Subscription)
(Planned) Midtrans / Xendit
(Planned) Realtime Channels (chat, inventory)
(Planned) Email (Resend/Mailgun)
```

### State & Services
```
React Context + useReducer
LocalStorage for persistence
Supabase client wrapper (src/lib/supabase.ts)
Stripe service abstraction (src/services/stripe.ts)
```

---

## 🏗️ Arsitektur Folder (Ringkas)

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
```

---

## 📦 Skema Basis Data (Saat Ini – Stripe)

Tabel (dari migrasi):
```
stripe_customers
stripe_subscriptions
stripe_orders
Views:
  stripe_user_subscriptions
  stripe_user_orders
```
RLS aktif untuk isolasi data user.

(Future tables: products, inventory, chat_messages, reviews, user_profiles, roles.)

---

## ✨ Fitur E-Commerce (Repo + Klaim Gabungan)

| Fitur | Status Publik | Klaim Platform |
|-------|---------------|----------------|
| Katalog produk (mock) | ✅ | Akan tersinkron realtime |
| Detail produk & perawatan | ✅ (static mock) | Real-time + dynamic |
| Keranjang belanja | ✅ | ✅ |
| Checkout dasar + Stripe session | ✅ | ✅ |
| Subscription Stripe | ✅ (schema & webhook) | ✅ |
| Multi payment (Bank/E-Wallet/COD) | ❌ (hanya Stripe) | Direncanakan |
| Order tracking UI | Partial | Real-time portal |
| Chat support | ❌ | ✅ (klaim) |
| Reviews & rating | ❌ | ✅ (klaim) |
| Role-based portals | ❌ | ✅ (klaim) |

---

## 💳 Stripe & Subscription

Sudah tersedia:
- Edge Function: `stripe-checkout` (membuat customer + session)
- Edge Function: `stripe-webhook` (sinkron event & orders)
- Tabel & views aman
- Status subscription placeholder (not_started → next phases)

Perlu peningkatan:
- Validasi whitelist price_id
- Pembaruan status subscription lanjutan (trial/past_due/paused)
- Refund / cancel flow
- Midtrans/Xendit integrasi lokal (opsional)

---

## 🗄️ Contoh Interface (Frontend)

```ts
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

## 🛠️ Installation & Setup

### Prasyarat
```
Node.js 18+
npm / yarn
Git
Supabase CLI
Stripe account (test keys)
```

### Langkah Cepat
```bash
git clone https://github.com/redeemself/azka-garden.git
cd azka-garden
npm install
cp .env.example .env   # isi variabel
npm run dev
```

### Variabel Lingkungan
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
# Hindari expose service role ke client production
VITE_SUPABASE_SERVICE_ROLE_KEY=...

# Optional
VITE_MIDTRANS_CLIENT_KEY=...
VITE_GOOGLE_ANALYTICS_ID=...
```

### Setup Supabase (Stripe)
```bash
supabase login
supabase link --project-ref <project-ref>
supabase db push

# Deploy Edge Functions
supabase functions deploy stripe-checkout
supabase functions deploy stripe-webhook

# Set secrets
supabase functions secrets set \
  STRIPE_SECRET_KEY=sk_test_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  SUPABASE_SERVICE_ROLE_KEY=service_role_key \
  SUPABASE_URL=https://<project>.supabase.co
```

---

## 🔐 Keamanan (Rekomendasi)
| Area | Tindakan |
|------|----------|
| Service Role Key | Gunakan hanya di server/Edge Functions |
| RLS | Tambahkan untuk tabel baru (chat, reviews, products) |
| Input Payment | Validasi price_id di Edge Function |
| Logging | Mask email / token sensitif |
| Credential Demo | Putar ulang bila dipakai publik |

---

## 🧪 Testing Checklist
| Domain | Tes |
|--------|-----|
| Stripe Checkout | Session → redirect → webhook insert |
| Subscription | Event update (trial/active) |
| RLS | User A tidak lihat data user B |
| Performance | Lighthouse & bundle size |
| Error Paths | Invalid price_id / unauthorized access |

---

## 📊 Status Implementasi (Ringkas)

```text
✅ Frontend dasar (produk mock, cart, checkout)
✅ Stripe integration (schema + functions)
🕒 Subscription handling lanjutan
🕒 Portal peran (klaim, belum di repo publik)
🕒 Auth UI (klaim sudah ada di deployment)
❌ Chat realtime (belum di repo)
❌ Reviews & rating (belum di repo)
❌ Inventory realtime
```

---

## 🔮 Roadmap

### Phase 1 (Foundation Expansion)
- [ ] Push auth UI & role guard
- [ ] Products table (Supabase) + RLS
- [ ] User profiles & roles
- [ ] Reviews schema + UI
- [ ] Chat schema + realtime channel

### Phase 2 (Advanced Commerce)
- [ ] Email notifications
- [ ] Shipping workflow
- [ ] Discount/promo engine
- [ ] Advanced search & filtering
- [ ] Wishlist

### Phase 3 (Scale & Observability)
- [ ] Metrics & monitoring dashboard
- [ ] SEO & sitemap
- [ ] Analytics (PostHog / GA)
- [ ] PWA / Mobile shell
- [ ] Error & performance tracing (Sentry)

---

## 👥 Kontribusi

```bash
1. Fork repository
2. git checkout -b feature/AmazingFeature
3. git commit -m "feat: add AmazingFeature"
4. git push origin feature/AmazingFeature
5. Buka Pull Request
```

Ide Issue:
- Implement auth UI + role routing
- Tabel products + inventory RLS
- Chat realtime (Supabase Realtime)
- Reviews module + rating UI
- Admin dashboard shell
- Stripe refund & status sync improvement

---

## 📄 License

MIT License – lihat file [LICENSE](LICENSE).

---

## 🌐 Deployment

| Jenis | URL |
|-------|-----|
| Live (klaim) | https://storied-pony-6862fe.netlify.app |
| Alternatif demo | https://azka-garden.vercel.app (contoh) |

> Pastikan environment di hosting diisi (Supabase URL, Anon key, Stripe keys, dsb).

---

## ❓ Ketidaksesuaian Fitur

Jika Anda menemukan perbedaan antara README & implementasi aktual, silakan buka issue dengan label:
```
documentation
discrepancy
```

---

<div align="center">

### 🌟 Built with ❤️ for Plant Lovers
*Transforming the way Indonesia shops for plants*

**[🚀 Live Demo](https://storied-pony-6862fe.netlify.app)** • **[📖 Wiki](https://github.com/redeemself/azka-garden/wiki)** • **[🐛 Report Bug](https://github.com/redeemself/azka-garden/issues)**

<br/>

_Made by [redeemself](https://github.com/redeemself) with 🌱_

</div>
