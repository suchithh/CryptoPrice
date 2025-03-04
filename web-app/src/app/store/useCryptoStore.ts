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

export interface HistoricalData {
  prices: [number, number][]; // [timestamp, price]
}

// Modified cache structure to include time frame
interface HistoricalDataCache {
  [cryptoId: string]: {
    [days: number]: HistoricalData;
  };
}

interface CryptoState {
  cryptocurrencies: Cryptocurrency[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  selectedCryptoId: string | null;
  historicalData: HistoricalDataCache;
  isChartLoading: boolean;
  isModalOpen: boolean;
  fetchCryptocurrencies: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  selectCrypto: (id: string) => void;
  closeModal: () => void;
  fetchHistoricalData: (id: string, days?: number) => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  cryptocurrencies: [],
  searchTerm: '',
  isLoading: false,
  error: null,
  selectedCryptoId: null,
  historicalData: {},
  isChartLoading: false,
  isModalOpen: false,
  
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
  
  selectCrypto: (id) => {
    set({ selectedCryptoId: id, isModalOpen: true });
    
    // Default days value
    const defaultDays = 7;
    
    // Load historical data if we don't have it cached for this time frame
    const state = get();
    if (!state.historicalData[id] || !state.historicalData[id][defaultDays]) {
      state.fetchHistoricalData(id, defaultDays);
    }
  },
  
  closeModal: () => set({ isModalOpen: false }),
  
  fetchHistoricalData: async (id, days = 7) => {
    set({ isChartLoading: true });
    
    // Check if we already have this specific time frame cached
    const state = get();
    if (state.historicalData[id]?.[days]) {
      set({ isChartLoading: false });
      return; // Use cached data
    }
    
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: days,
          },
        }
      );
      
      set(state => ({
        historicalData: {
          ...state.historicalData,
          [id]: {
            ...(state.historicalData[id] || {}),
            [days]: response.data
          }
        },
        isChartLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch historical data',
        isChartLoading: false
      });
    }
  }
}));