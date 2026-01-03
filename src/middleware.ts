import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    return await next();
  } catch (error) {
    console.error('Error en middleware:', error);
    
    // Si es una página que necesita datos de Supabase y falla
    if (error instanceof Error && error.message.includes('Supabase')) {
      return new Response('Error de conexión con la base de datos. Verifica tus variables de entorno.', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
    
    throw error;
  }
});