import { supabase } from '../lib/supabase';

export interface HealthCheckResult {
  ok: boolean;
  type?: 'network' | 'query' | 'unexpected';
  error?: any;
}

export async function supabaseHealthCheck(): Promise<HealthCheckResult> {
  try {
    const { error } = await supabase
      .from('stripe_user_subscriptions')
      .select('subscription_id')
      .limit(1);
    
    if (error) {
      console.warn('Health check query error (bukan network):', error);
      return { ok: false, type: 'query', error };
    }
    
    return { ok: true };
  } catch (e: any) {
    if (e.message?.includes('Failed to fetch')) {
      return { ok: false, type: 'network', error: e };
    }
    return { ok: false, type: 'unexpected', error: e };
  }
}

export async function testManualFetch(): Promise<HealthCheckResult> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/stripe_user_subscriptions?select=*`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      }
    );
    
    if (response.ok || response.status === 401 || response.status === 404) {
      return { ok: true };
    }
    
    return { ok: false, type: 'query', error: `HTTP ${response.status}` };
  } catch (e: any) {
    if (e.message?.includes('Failed to fetch')) {
      return { ok: false, type: 'network', error: e };
    }
    return { ok: false, type: 'unexpected', error: e };
  }
}