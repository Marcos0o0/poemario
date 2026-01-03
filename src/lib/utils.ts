/**
 * Genera un slug a partir de un texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales con -
    .replace(/^-+|-+$/g, ''); // Eliminar - al inicio y final
}

/**
 * Formatea una fecha para mostrarla
 */
export function formatDate(date: string | Date, locale = 'es-ES'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formatea una fecha con hora
 */
export function formatDateTime(date: string | Date, locale = 'es-ES'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Obtiene el ícono emoji para una categoría
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'romántico': '🌹',
    'cottage-core': '🌿',
    'sereno': '🌊',
    'nostálgico': '🍂',
    'esperanza': '✨',
    'melancolía': '🌙',
    'alegría': '☀️',
    'reflexión': '💭',
  };
  
  return icons[category.toLowerCase()] || '📝';
}

/**
 * Trunca un texto a un número de caracteres
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Obtiene el primer verso de un poema
 */
export function getFirstVerse(content: string): string {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  return lines[0] || '';
}

/**
 * Cuenta el número de versos en un poema
 */
export function countVerses(content: string): number {
  return content.split('\n').filter(line => line.trim() !== '').length;
}

/**
 * Valida un slug
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Obtiene un color según el tema
 */
export function getThemeColor(theme: string): string {
  const colors: Record<string, string> = {
    'romántico': 'rose',
    'cottage-core': 'emerald',
    'sereno': 'sky',
    'nostálgico': 'amber',
  };
  
  return colors[theme] || 'rose';
}