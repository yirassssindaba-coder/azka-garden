import { supabase } from '../lib/supabase';

export interface HealthCheckResult {
  // If supabase client is null (not configured), return demo mode status
  if (!supabase) {
    console.log('Supabase not configured - running in demo mode');
    return { ok: false, type: 'not_configured', demo: true };
  }

  ok: boolean;
  type?: 'network' | 'query' | 'unexpected';
  error?: any;
}

export async function supabaseHealthCheck(): Promise<HealthCheckResult> {
  try {
    // Check if Supabase client is available
    if (!supabase) {
      return { ok: false, type: 'network', error: new Error('Supabase client not initialized') };
    }
    
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
      console.log('Network connection failed - using demo mode');
      return { ok: false, type: 'network', error: e, demo: true };
    }
    console.log('Unexpected error - using demo mode');
    return { ok: false, type: 'unexpected', error: e, demo: true };
  }
}

export async function testManualFetch(): Promise<HealthCheckResult> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return { ok: false, type: 'network', error: new Error('Missing Supabase configuration') };
    }
    
    const response = await fetch(
      `${supabaseUrl}/rest/v1/stripe_user_subscriptions?select=*`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
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