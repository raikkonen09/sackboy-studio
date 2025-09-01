import { NextResponse } from 'next/server';
import { buildPrompt } from '@/lib/prompt';

export const runtime = 'edge';

/**
 * API route handler for /api/stylize. Accepts multipart form data with an
 * `image` field plus stylisation controls. It builds a prompt from the
 * controls and makes a request to the OpenAI Images API to generate a
 * stylised version of the uploaded image. Returns a JSON payload with the
 * generated image as a base64 string.
 */
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('image');
  const size = (formData.get('size') as string) || '1024';
  const styleStrength = (formData.get('styleStrength') as string) || 'medium';
  const diorama = formData.get('diorama') === 'true';

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Missing image file' }, { status: 400 });
  }
  // Convert the uploaded image to a data URI (base64) for the API call
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');

  const prompt = buildPrompt({ styleStrength, diorama });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Server misconfigured: missing OpenAI API key' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        image: base64,
        n: 1,
        size: `${size}x${size}`
      })
    });
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 500 });
    }
    const data = await response.json();
    const imageBase64: string | undefined = data?.data?.[0]?.b64_json;
    if (!imageBase64) {
      return NextResponse.json({ error: 'Invalid response from OpenAI' }, { status: 500 });
    }
    return NextResponse.json({ imageBase64, meta: { size, styleStrength } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}