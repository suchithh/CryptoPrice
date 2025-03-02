import React from 'react';
import Image from 'next/image';
import { Cryptocurrency, useCryptoStore } from '@/store/useCryptoStore';

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const { selectCrypto } = useCryptoStore();
  const priceChangeIsPositive = crypto.price_change_percentage_24h >= 0;
  
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-transform hover:scale-105 cursor-pointer"
      onClick={() => selectCrypto(crypto.id)}
    >
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 mr-3">
          <Image
            src={crypto.image}
            alt={crypto.name}
            fill
            className="rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{crypto.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm uppercase">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">Current Price</p>
          <p className="font-bold text-lg">${crypto.current_price.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">24h Change</p>
          <p className={`font-medium ${priceChangeIsPositive ? 'text-green-500' : 'text-red-500'}`}>
            {priceChangeIsPositive ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
        
        <div className="col-span-2">
          <p className="text-gray-500 dark:text-gray-400 text-xs">Market Cap</p>
          <p className="font-medium">${crypto.market_cap.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mt-3 text-right">
        <p className="text-gray-400 dark:text-gray-500 text-xs">
          Last updated: {new Date(crypto.last_updated).toLocaleString()}
        </p>
      </div>
    </div>
  );
};