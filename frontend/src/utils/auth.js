/**
 * Decode a JWT token without an external library.
 * Splits on '.' and base64-decodes the payload (index 1).
 */
export function decodeToken(token) {
  try {
    const base64Payload = token.split(".")[1];
    // Fix URL-safe base64 chars and add padding — atob() requires proper padding
    const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Extract role from stored JWT in localStorage.
 * Returns "user" as fallback if no token or decode fails.
 */
export function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = decodeToken(token);
  return payload?.role || "user";
}
