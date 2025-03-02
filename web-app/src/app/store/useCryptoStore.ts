import { create } from 'zustand';
import axios from 'axios';

export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  last_updated: string;
}

interface CryptoState {
  cryptocurrencies: Cryptocurrency[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  fetchCryptocurrencies: () => Promise<void>;
  setSearchTerm: (term: string) => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  cryptocurrencies: [],
  searchTerm: '',
  isLoading: false,
  error: null,
  fetchCryptocurrencies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20, // Fetch more than 5 to allow for filtering
            page: 1,
            sparkline: false,
            price_change_percentage: '24h',
          },
        }
      );
      set({ cryptocurrencies: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch data', 
        isLoading: false 
      });
    }
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
}));