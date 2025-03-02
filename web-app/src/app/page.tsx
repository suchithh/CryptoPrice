// src/app/page.tsx
'use client';

import { CryptoDashboard } from '@/components/crypto/CryptoDashboard';
import { CryptoChartModal } from '@/components/crypto/CryptoChartModal';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">
        <CryptoDashboard />
        <CryptoChartModal />
      </main>
    </ThemeProvider>
  );
}