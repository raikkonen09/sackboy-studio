/**
 * Converts a Blob or File into a base64-encoded string. Useful on the
 * client side when preparing images for upload to the API. Note: this
 * function operates in the browser; it is not used directly by the API
 * route which uses Node buffers instead.
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}