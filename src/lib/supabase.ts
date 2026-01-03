import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para TypeScript
export interface Poema {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  theme: string;
  subtitle?: string;
  published_date: string;
  created_at: string;
}

export interface Like {
  id: string;
  poema_id: string;
  liked_at: string;
}

// Funciones helper
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
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('poema_id', poemaId)
    .maybeSingle();
  
  if (error) throw error;
  return data as Like | null;
}

export async function toggleLike(poemaId: string) {
  // Verificar si ya existe un like
  const existingLike = await getLikeForPoema(poemaId);
  
  if (existingLike) {
    // Quitar like
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('poema_id', poemaId);
    
    if (error) throw error;
    return false; // Ya no tiene like
  } else {
    // Agregar like
    const { error } = await supabase
      .from('likes')
      .insert({ poema_id: poemaId });
    
    if (error) throw error;
    return true; // Ahora tiene like
  }
}

export async function createPoema(poema: Omit<Poema, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('poemas')
    .insert(poema)
    .select()
    .single();
  
  if (error) throw error;
  return data as Poema;
}

export async function getAllLikes() {
  const { data, error } = await supabase
    .from('likes')
    .select(`
      *,
      poemas (
        title,
        slug,
        published_date
      )
    `)
    .order('liked_at', { ascending: false });
  
  if (error) throw error;
  return data;
}