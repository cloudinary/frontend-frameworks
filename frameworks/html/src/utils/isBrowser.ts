/**
 * return true when in browser
 */
export function isBrowser(): boolean{
  return typeof window !== 'undefined';
}
