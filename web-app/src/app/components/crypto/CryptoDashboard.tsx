import React, { useEffect, useState } from "react";
import { useCryptoStore } from "../../store/useCryptoStore";
import { CryptoCard } from "./CryptoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const CryptoDashboard: React.FC = () => {
  const {
    cryptocurrencies,
    searchTerm,
    isLoading,
    error,
    fetchCryptocurrencies,
    setSearchTerm,
  } = useCryptoStore();

  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [itemsToDisplay, setItemsToDisplay] = useState<number>(5);

  useEffect(() => {
    fetchCryptocurrencies();
    setLastRefreshed(new Date());

    // Set up a refresh interval every 60 seconds
    const intervalId = setInterval(() => {
      fetchCryptocurrencies();
      setLastRefreshed(new Date());
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchCryptocurrencies]);

  useEffect(() => {
    // This only runs on client side
    setFormattedDate(lastRefreshed.toLocaleString());
  }, [lastRefreshed]);

  const handleRefresh = () => {
    fetchCryptocurrencies();
    setLastRefreshed(new Date());
  };

  const filteredCryptos = cryptocurrencies.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold mb-4 sm:mb-0">
            Crypto Price Tracker
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <Input
              type="text"
              placeholder="Search cryptocurrencies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                x
              </button>
            )}
          </div>

          <div className="flex justify-center sm:justify-start gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing
                </>
              ) : (
                "Refresh"
              )}
            </Button>

            <Select
              value={String(itemsToDisplay)}
              onValueChange={(val) => setItemsToDisplay(Number(val))}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 items</SelectItem>
                <SelectItem value="10">10 items</SelectItem>
                <SelectItem value="15">15 items</SelectItem>
                <SelectItem value="20">20 items</SelectItem>
              </SelectContent>
            </Select>

            <ThemeToggle />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:text-red-200 dark:border-red-800">
          Error: {error}
        </div>
      )}

      {isLoading && cryptocurrencies.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredCryptos.slice(0, itemsToDisplay).map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}

      {filteredCryptos.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No cryptocurrencies found matching &quot;{searchTerm}&quot;
          </p>
        </div>
      )}

      <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        Data provided by CoinGecko API
      </div>
      <div className="text-xs text-gray-500 text-center dark:text-gray-400">
        Last refreshed: {formattedDate}
      </div>
    </div>
  );
};
