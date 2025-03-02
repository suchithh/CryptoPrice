import React, { useEffect } from 'react';
import { useCryptoStore } from '../../store/useCryptoStore';
import { CryptoCard } from './CryptoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';

export const CryptoDashboard: React.FC = () => {
  const { 
    cryptocurrencies, 
    searchTerm, 
    isLoading, 
    error, 
    fetchCryptocurrencies, 
    setSearchTerm 
  } = useCryptoStore();

  useEffect(() => {
    fetchCryptocurrencies();
    // Set up a refresh interval every 60 seconds
    const intervalId = setInterval(fetchCryptocurrencies, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchCryptocurrencies]);

  const filteredCryptos = cryptocurrencies.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Crypto Price Tracker</h1>
        
        <div className="flex w-full sm:w-auto gap-2">
          <Input
            type="text"
            placeholder="Search cryptocurrencies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          
          <Button 
            onClick={() => fetchCryptocurrencies()} 
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Refreshing
              </>
            ) : (
              'Refresh'
            )}
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      {isLoading && cryptocurrencies.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredCryptos.slice(0, 10).map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}
      
      {filteredCryptos.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No cryptocurrencies found matching "{searchTerm}"
          </p>
        </div>
      )}
      
      <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        Data provided by CoinGecko API
      </div>
    </div>
  );
};