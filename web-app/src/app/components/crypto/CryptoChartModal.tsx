import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCryptoStore } from '@/store/useCryptoStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ReloadIcon } from '@radix-ui/react-icons';

interface TimeRange {
  label: string;
  days: number;
}

const timeRanges: TimeRange[] = [
  { label: '1D', days: 1 },
  { label: '7D', days: 7 },
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: 'YTD', days: 365 },
];

export const CryptoChartModal: React.FC = () => {
  const {
    selectedCryptoId,
    isModalOpen,
    cryptocurrencies,
    historicalData,
    isChartLoading,
    closeModal,
    fetchHistoricalData
  } = useCryptoStore();
  
  const [selectedTimeRange, setSelectedTimeRange] = useState<number>(7);
  
  // Find the selected cryptocurrency
  const selectedCrypto = cryptocurrencies.find(
    crypto => crypto.id === selectedCryptoId
  );
  
  if (!selectedCrypto) return null;
  
  const chartData = selectedCryptoId ? historicalData[selectedCryptoId]?.prices?.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString(),
    price
  })) || [] : [];
  
  const handleTimeRangeChange = (days: number) => {
    setSelectedTimeRange(days);
    fetchHistoricalData(selectedCryptoId!, days);
  };
  
  const formatPrice = (price: number) => {
    return price >= 1
      ? `$${price.toFixed(2)}`
      : `$${price.toFixed(6)}`;
  };
  
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img src={selectedCrypto.image} alt={selectedCrypto.name} className="w-6 h-6" />
            {selectedCrypto.name} ({selectedCrypto.symbol.toUpperCase()})
            <span className={`text-sm ml-2 ${
              selectedCrypto.price_change_percentage_24h >= 0 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {selectedCrypto.price_change_percentage_24h >= 0 ? '+' : ''}
              {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </DialogTitle>
          <DialogDescription>
            Current Price: {formatPrice(selectedCrypto.current_price)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center gap-2 mb-4">
          {timeRanges.map((range) => (
            <Button
              key={range.days}
              variant={selectedTimeRange === range.days ? "default" : "outline"}
              size="sm"
              onClick={() => handleTimeRangeChange(range.days)}
            >
              {range.label}
            </Button>
          ))}
        </div>
        
        <div className="h-[300px] w-full">
          {isChartLoading ? (
            <div className="flex justify-center items-center h-full">
              <ReloadIcon className="h-12 w-12 animate-spin text-blue-500" />
            </div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    if (selectedTimeRange <= 7) return value;
                    // For longer time periods, show fewer labels
                    const date = new Date(value);
                    return date.getDate() === 1 || date.getDate() === 15 
                      ? `${date.getMonth() + 1}/${date.getDate()}`
                      : '';
                  }}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => formatPrice(value)}
                />
                <Tooltip 
                  formatter={(value: number) => [formatPrice(value), 'Price']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              No data available
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <span>Market Cap: ${selectedCrypto.market_cap.toLocaleString()}</span>
          <span>Last Updated: {new Date(selectedCrypto.last_updated).toLocaleString()}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};