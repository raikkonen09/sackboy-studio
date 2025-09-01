import '@/app/globals.css';
import type { ReactNode } from 'react';

/**
 * Root layout for the Sackboy Studio app. Imports global CSS and sets up the
 * default HTML structure including the head. Using the App Router, this
 * component wraps all pages.
 */
export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}