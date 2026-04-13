/**
 * Feature flag for the AI Vocal Remover.
 * Set ENABLE_VOCAL_REMOVER=true in .env.local to activate.
 * When false (default), the page and all API routes return 404.
 */
export function isVocalRemoverEnabled(): boolean {
  return process.env.ENABLE_VOCAL_REMOVER === 'true';
}
