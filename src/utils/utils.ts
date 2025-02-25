import { redirect } from 'next/navigation';

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * If the path already has query parameters, it appends the new parameter using '&',
 * otherwise, it uses '?' to start the query string.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(type: 'error' | 'success', path: string, message: string) {
  const separator = path.includes('?') ? '&' : '?';
  return redirect(`${path}${separator}${type}=${encodeURIComponent(message)}`);
}
