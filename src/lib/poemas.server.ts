import { supabase } from './supabase.server';
import type { Poema, Like } from './types';

export async function getPoemas() {
  const { data, error } = await supabase
    .from('poemas')
    .select('*')
    .order('published_date', { ascending: false });

  if (error) throw error;
  return data as Poema[];
}

export async function getPoemaBySlug(slug: string) {
  const { data, error } = await supabase
    .from('poemas')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Poema;
}

export async function getLikeForPoema(poemaId: string) {
  const { data } = await supabase
    .from('likes')
    .select('*')
    .eq('poema_id', poemaId)
    .maybeSingle();

  return data as Like | null;
}
