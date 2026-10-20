import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  (import.meta as unknown as { env: Record<string, string> }).env?.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  (import.meta as unknown as { env: Record<string, string> }).env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      !supabaseUrl.includes('your-project') &&
      !supabaseAnonKey.includes('your-anon-key') &&
      supabaseUrl.startsWith('https://')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Uploads an image or video file to Supabase Storage (bucket: gym-media)
 * Returns public URL on success or null on failure / unconfigured mode.
 */
export async function uploadToSupabaseStorage(
  file: File,
  bucket = 'gym-media'
): Promise<string | null> {
  if (!supabase) return null;

  try {
    const cleanFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .toLowerCase();
    const filePath = `uploads/${Date.now()}-${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.warn('[Supabase Storage Upload Error]:', uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.warn('[Supabase Storage Exception]:', err);
    return null;
  }
}

/**
 * Subscribe to Supabase Realtime updates on any table
 */
export function subscribeToTable<T = any>(
  table: string,
  onPayload: (payload: { eventType: string; new: T; old: T }) => void
): () => void {
  if (!supabase) return () => {};

  const channel = supabase
    .channel(`public:${table}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      (payload: any) => {
        onPayload({
          eventType: payload.eventType,
          new: payload.new,
          old: payload.old,
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
