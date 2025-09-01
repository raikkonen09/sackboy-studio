/**
 * Minimal helper for calling the OpenAI Images API. This module can be
 * extended or replaced as the API evolves. See
 * https://platform.openai.com/docs/api-reference/images for details.
 */
export interface GenerateImageRequest {
  prompt: string;
  imageBase64: string;
  size: string;
}

export interface GenerateImageResponse {
  imageBase64: string;
}

export async function generateImage(
  apiKey: string,
  { prompt, imageBase64, size }: GenerateImageRequest
): Promise<GenerateImageResponse> {
  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      image: imageBase64,
      n: 1,
      size: `${size}x${size}`
    })
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  const img = data?.data?.[0]?.b64_json;
  if (!img) throw new Error('Invalid response from OpenAI');
  return { imageBase64: img };
}