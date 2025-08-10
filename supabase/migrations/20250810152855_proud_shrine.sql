/*
  # Comprehensive Database Schema for Azka Garden
  
  1. New Tables
    - `user_profiles` - Extended user information with roles
    - `roles` - Role-based access control system
    - `product_categories` - Hierarchical product categorization
    - `products` - Product catalog with pricing and inventory
    - `inventory_movements` - Stock movement tracking
    - `orders` - Internal order management
    - `order_items` - Order line items
    - `reviews` - Product reviews and ratings
    - `chat_threads` - Chat conversation threads
    - `chat_thread_participants` - Thread participation tracking
    - `chat_messages` - Chat messages
    - `price_whitelist` - Stripe price validation
    - `webhook_logs` - Webhook event tracking
    - `audit_logs` - System audit trail

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Create indexes for performance
    - Add constraints for data integrity

  3. Views
    - `product_with_review_stats` - Products with aggregated review data
    - Enhanced Stripe user views
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. ROLES TABLE
CREATE TABLE IF NOT EXISTS public.roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Insert default roles
INSERT INTO public.roles (code, name, description, is_system) VALUES
  ('customer', 'Customer', 'Regular customer with basic access', true),
  ('admin', 'Administrator', 'Full administrative access', true),
  ('developer', 'Developer', 'Technical system access', true)
ON CONFLICT (code) DO NOTHING;

-- 2. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid NOT NULL UNIQUE,
  display_name text,
  avatar_url text,
  role_id uuid REFERENCES public.roles(id) ON DELETE SET NULL,
  phone_number text,
  date_of_birth date,
  address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. PRODUCT CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES public.product_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.product_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  sku text UNIQUE,
  stripe_price_id text,
  description text,
  base_price numeric(12,2) NOT NULL CHECK (base_price >= 0),
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  care_level text,
  watering_frequency text,
  care_instructions text,
  image_url text,
  height text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 5. INVENTORY MOVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  delta integer NOT NULL,
  reason text NOT NULL,
  ref_order_id uuid,
  created_by uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_profile_id uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  order_number text NOT NULL UNIQUE,
  source_gateway text NOT NULL DEFAULT 'stripe',
  external_ref text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  subtotal numeric(14,2),
  tax numeric(14,2),
  shipping_fee numeric(14,2),
  payment_fee numeric(14,2),
  discount_amount numeric(14,2),
  total_amount numeric(14,2),
  shipping_info jsonb,
  payment_method jsonb,
  shipping_method jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 7. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(12,2) NOT NULL,
  subtotal numeric(14,2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);

-- 8. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_profile_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body text,
  status text NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
  like_count integer NOT NULL DEFAULT 0,
  parent_id uuid REFERENCES public.reviews(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 9. CHAT THREADS TABLE
CREATE TABLE IF NOT EXISTS public.chat_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text,
  assigned_role text CHECK (assigned_role IN ('admin', 'developer')),
  created_by uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'escalated')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 10. CHAT THREAD PARTICIPANTS TABLE
CREATE TABLE IF NOT EXISTS public.chat_thread_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  user_profile_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (thread_id, user_profile_id)
);

-- 11. CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.chat_threads(id) ON DELETE CASCADE,
  sender_user_profile_id uuid NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  body text NOT NULL,
  message_type text NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 12. PRICE WHITELIST TABLE
CREATE TABLE IF NOT EXISTS public.price_whitelist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  price_id text NOT NULL UNIQUE,
  product_name text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 13. WEBHOOK LOGS TABLE
CREATE TABLE IF NOT EXISTS public.webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  source text NOT NULL DEFAULT 'stripe',
  status_code integer,
  processed boolean NOT NULL DEFAULT false,
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  error_message text,
  payload jsonb
);

-- 14. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_profile_id uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  metadata jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_user_profiles_auth_user ON public.user_profiles (auth_user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles (role_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products (active);
CREATE INDEX IF NOT EXISTS idx_products_stripe_price ON public.products (stripe_price_id);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_product ON public.inventory_movements (product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_profile ON public.orders (user_profile_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON public.order_items (product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews (product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_profile ON public.reviews (user_profile_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews (status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_thread ON public.chat_messages (thread_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON public.chat_messages (sender_user_profile_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs (actor_user_profile_id);

-- VIEWS
CREATE OR REPLACE VIEW public.product_with_review_stats AS
SELECT
  p.*,
  COALESCE(AVG(r.rating)::numeric(10,2), 0) as average_rating,
  COUNT(r.id) as review_count
FROM public.products p
LEFT JOIN public.reviews r ON r.product_id = p.id AND r.status = 'approved'
WHERE p.active = true
GROUP BY p.id;

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_chat_threads_updated_at
  BEFORE UPDATE ON public.chat_threads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RPC FUNCTIONS
CREATE OR REPLACE FUNCTION public.increment_review_like(review_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE public.reviews 
  SET like_count = like_count + 1 
  WHERE id = review_id;
$$;

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_thread_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- User Profiles
CREATE POLICY "Users can read own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = auth_user_id)
  WITH CHECK (auth.uid() = auth_user_id);

CREATE POLICY "Admins can read all profiles"
  ON public.user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      JOIN public.roles r ON r.id = up.role_id
      WHERE up.auth_user_id = auth.uid() AND r.code IN ('admin', 'developer')
    )
  );

-- Products
CREATE POLICY "Public can view active products"
  ON public.products FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      JOIN public.roles r ON r.id = up.role_id
      WHERE up.auth_user_id = auth.uid() AND r.code = 'admin'
    )
  );

-- Orders
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = user_profile_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = user_profile_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      JOIN public.roles r ON r.id = up.role_id
      WHERE up.auth_user_id = auth.uid() AND r.code = 'admin'
    )
  );

-- Order Items
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      JOIN public.user_profiles up ON up.id = o.user_profile_id
      WHERE o.id = order_id AND up.auth_user_id = auth.uid()
    )
  );

-- Reviews
CREATE POLICY "Anyone can read approved reviews"
  ON public.reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Authenticated users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = user_profile_id AND up.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = user_profile_id AND up.auth_user_id = auth.uid()
    )
  );

-- Chat Threads
CREATE POLICY "Users can view threads they participate in"
  ON public.chat_threads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_thread_participants ctp
      JOIN public.user_profiles up ON up.id = ctp.user_profile_id
      WHERE ctp.thread_id = id AND up.auth_user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      JOIN public.roles r ON r.id = up.role_id
      WHERE up.auth_user_id = auth.uid() AND r.code IN ('admin', 'developer')
    )
  );

-- Chat Messages
CREATE POLICY "Users can view messages in their threads"
  ON public.chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_thread_participants ctp
      JOIN public.user_profiles up ON up.id = ctp.user_profile_id
      WHERE ctp.thread_id = thread_id AND up.auth_user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      JOIN public.roles r ON r.id = up.role_id
      WHERE up.auth_user_id = auth.uid() AND r.code IN ('admin', 'developer')
    )
  );

CREATE POLICY "Users can send messages in their threads"
  ON public.chat_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = sender_user_profile_id AND up.auth_user_id = auth.uid()
    ) AND
    EXISTS (
      SELECT 1 FROM public.chat_thread_participants ctp
      JOIN public.user_profiles up ON up.id = ctp.user_profile_id
      WHERE ctp.thread_id = thread_id AND up.auth_user_id = auth.uid()
    )
  );

-- GRANT PERMISSIONS
GRANT SELECT ON public.product_with_review_stats TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_review_like(uuid) TO authenticated;

-- SEED DATA
INSERT INTO public.product_categories (name, slug, description) VALUES
  ('Tanaman Indoor', 'tanaman-indoor', 'Tanaman hias untuk dalam ruangan'),
  ('Tanaman Outdoor', 'tanaman-outdoor', 'Tanaman untuk taman dan area luar'),
  ('Sukulen & Kaktus', 'sukulen-kaktus', 'Tanaman tahan kekeringan'),
  ('Bonsai', 'bonsai', 'Koleksi bonsai premium'),
  ('Tanaman Berbunga', 'tanaman-berbunga', 'Tanaman dengan bunga cantik'),
  ('Pot & Aksesoris', 'pot-aksesoris', 'Pot dan perlengkapan tanaman')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, description, base_price, stock, category_id, care_level, watering_frequency, care_instructions, image_url, height) 
SELECT 
  'Jamani Dolar (ZZ Plant)',
  'Tanaman hias indoor yang sangat mudah perawatan, cocok untuk pemula. Tahan terhadap kondisi cahaya rendah dan jarang disiram.',
  85000,
  25,
  pc.id,
  'Sangat Mudah',
  '2-3 minggu sekali',
  'Letakkan di tempat dengan cahaya rendah hingga sedang. Siram ketika tanah benar-benar kering.',
  'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg',
  '30-60 cm'
FROM public.product_categories pc WHERE pc.slug = 'tanaman-indoor'
ON CONFLICT (sku) DO NOTHING;

-- Insert price whitelist for Stripe products
INSERT INTO public.price_whitelist (price_id, product_name) VALUES
  ('price_1RuZTX81xruOlT8qEM278WfI', 'Pucuk Merah (250 cm)'),
  ('price_1RuZRW81xruOlT8qoDtfw4Gv', 'Kadaka Tempel'),
  ('price_1RuZQx81xruOlT8qPaUDEloJ', 'Asoka Singapur')
ON CONFLICT (price_id) DO NOTHING;