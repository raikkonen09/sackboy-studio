"use client";

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';

/**
 * The main page of Sackboy Studio. Provides a simple interface for uploading an
 * image, selecting stylisation options, generating a plush craft version via
 * the API and overlaying a caption. This implementation focuses on the core
 * functionality; feel free to extend or polish the UI.
 */
export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [size, setSize] = useState('1024');
  const [styleStrength, setStyleStrength] = useState('medium');
  const [diorama, setDiorama] = useState(false);
  const [caption, setCaption] = useState('');
  const [resultData, setResultData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('size', size);
      formData.append('styleStrength', styleStrength);
      formData.append('diorama', String(diorama));
      const res = await fetch('/api/stylize', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to generate image');
      }
      const data = await res.json();
      // data.imageBase64 contains the generated image (base64)
      setResultData(data.imageBase64);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      // reset previous result when new file chosen
      setResultData(null);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Sackboy Studio</h1>
      {/* Upload input */}
      <div className="border border-dashed border-gray-400 rounded p-6 flex flex-col items-center justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-600 mt-2">Upload a PNG/JPG/WebP (max 8 MB).</p>
      </div>

      {file && (
        <div className="space-y-4">
          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="size">
                Output size
              </label>
              <select
                id="size"
                className="w-full border rounded p-2"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="512">512×512</option>
                <option value="768">768×768</option>
                <option value="1024">1024×1024</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="style">
                Style strength
              </label>
              <select
                id="style"
                className="w-full border rounded p-2"
                value={styleStrength}
                onChange={(e) => setStyleStrength(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="col-span-2 flex items-center">
              <input
                id="diorama"
                type="checkbox"
                checked={diorama}
                onChange={(e) => setDiorama(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="diorama" className="text-sm">
                Craft diorama background
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1" htmlFor="caption">
                Caption (optional)
              </label>
              <input
                id="caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Enter a caption for your image"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded shadow disabled:opacity-50"
          >
            {loading ? 'Generating…' : 'Generate'}
          </button>
        </div>
      )}

      {/* Preview */}
      {file && (
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="flex-1 relative border rounded overflow-hidden">
            <p className="text-center text-sm py-1 font-medium bg-gray-100 border-b">Original</p>
            <div className="aspect-square relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt="Original preview"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          <div className="flex-1 relative border rounded overflow-hidden">
            <p className="text-center text-sm py-1 font-medium bg-gray-100 border-b">Stylised</p>
            <div className="aspect-square relative flex items-center justify-center bg-gray-50">
              {resultData ? (
                <div className="relative w-full h-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:image/png;base64,${resultData}`}
                    alt="Stylised result"
                    className="object-contain w-full h-full"
                  />
                  {caption && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/60 text-white text-sm rounded">
                      {caption}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">{loading ? 'Generating...' : 'No result yet'}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-600 text-sm mt-2">Error: {error}</p>}
    </main>
  );
}