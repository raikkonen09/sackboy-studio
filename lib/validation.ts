/**
 * Simple client-side validation for uploaded files. Ensures the file is of
 * acceptable type and size before sending to the server. Returns an error
 * message or null if the file is valid.
 */
export function validateUpload(file: File): string | null {
  const allowed = ['image/png', 'image/jpeg', 'image/webp'];
  if (!allowed.includes(file.type)) {
    return 'Only PNG, JPG and WebP images are supported.';
  }
  // 8 MB size limit
  const maxBytes = 8 * 1024 * 1024;
  if (file.size > maxBytes) {
    return 'Image must be 8 MB or less.';
  }
  return null;
}