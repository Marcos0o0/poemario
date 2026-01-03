import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { poemaId } = await request.json();
    
    if (!poemaId) {
      return new Response(JSON.stringify({ error: 'poemaId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if like exists
    const { data: existingLike } = await supabase
      .from('likes')
      .select('*')
      .eq('poema_id', poemaId)
      .maybeSingle();

    if (existingLike) {
      // Remove like
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('poema_id', poemaId);

      if (error) throw error;

      return new Response(JSON.stringify({ liked: false }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Add like
      const { error } = await supabase
        .from('likes')
        .insert({ poema_id: poemaId });

      if (error) throw error;

      return new Response(JSON.stringify({ liked: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};