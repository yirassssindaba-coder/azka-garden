import { Client } from 'pg';

export async function ensureOrderStatusSchema(connectionString: string) {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    await client.query(`
      ALTER TABLE orders
        ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'PENDING',
        ADD COLUMN IF NOT EXISTS tracking_number TEXT,
        ADD COLUMN IF NOT EXISTS estimated_delivery_date TIMESTAMPTZ;
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_status_history (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        old_status TEXT,
        new_status TEXT NOT NULL,
        changed_by INTEGER,
        note TEXT,
        metadata JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_class c
            JOIN pg_namespace n ON n.oid = c.relnamespace
           WHERE c.relkind = 'i'
             AND c.relname = 'idx_order_status_history_order_id'
        ) THEN
          CREATE INDEX idx_order_status_history_order_id ON order_status_history(order_id);
        END IF;
      END$$;
    `);
    await client.query(`
      INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, note, metadata, created_at)
      SELECT o.id, NULL, o.status, NULL, 'Initial backfill', NULL, NOW()
      FROM orders o
      WHERE NOT EXISTS (SELECT 1 FROM order_status_history h WHERE h.order_id = o.id);
    `);
  } finally {
    await client.end();
  }
}
