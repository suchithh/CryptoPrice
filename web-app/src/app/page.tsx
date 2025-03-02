'use client';

import { CryptoDashboard } from '@/components/crypto/CryptoDashboard';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <CryptoDashboard />
      </main>
    </ThemeProvider>
  );
}