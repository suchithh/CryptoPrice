---
id: challenges
title: Challenges & Solutions
sidebar_position: 3
---

# Challenges & Solutions

## UI Components & Design Decisions

### Component Structure

Given the tight timeline, I opted for a focused component hierarchy:

-   `CryptoDashboard` as the main container component
-   `CryptoCard` as a reusable presentation component
-   Modular UI components from shadcn/UI to maintain consistency

This approach let me rapidly build the interface while maintaining clean separation of concerns.

### Responsive Design and Mobile Support

With limited time, I implemented responsive design through:

-   Flexbox layouts that adjust between column and row based on screen size
-   Tailwind's responsive modifiers (`sm:`, `lg:`, `xl:`) for breakpoint handling
-   Grid-based card layout that reflows from 1 to 5 columns as screen size increases or decreases
-   Mobile optimizations for search and controls

```tsx
<div className="flex flex-col sm:flex-row justify-between items-center mb-8">
    <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">
            Crypto Price Tracker
        </h1>
    </div>

    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
        {/* Search and controls */}
    </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
    {filteredCryptos.slice(0, itemsToDisplay).map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} />
    ))}
</div>
```

### Theme Support

I implemented a dark/light mode toggle that:

-   Uses system preferences as the default
-   Allows user override via a simple toggle button
-   Integrates with shadcn/UI's theming approach

### Performance Considerations

#### Data Management

To maintain performance with limited development time:

-   Implemented client-side filtering for search to prevent API request overhead
-   Created a paginated display with user-configurable items per page
-   Added visual feedback during loading states

```tsx
// Client-side filtering implementation
const filteredCryptos = cryptocurrencies.filter(
  (crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
);

// Display only the number of items the user has selected
{filteredCryptos.slice(0, itemsToDisplay).map((crypto) => (
  <CryptoCard key={crypto.id} crypto={crypto} />
))}
```

#### State Caching

I implemented a practical caching strategy to reduce API calls:

-   Historical data is cached by cryptocurrency ID in the Zustand store
-   The app checks the cache before making new requests

```tsx
// From useCryptoStore.ts
selectCrypto: (id) => {
  set({ selectedCryptoId: id, isModalOpen: true });

  // Load historical data if we don't have it cached
  const state = get();
  if (!state.historicalData[id]) {
    state.fetchHistoricalData(id);
  }
},
```

## Core Challenges & Solutions

### API Rate Limiting

**Challenge:** CoinGecko's free tier has a 30 requests/minute limit, which could easily be exceeded with real-time updates. CoinGecko also updates only every 1-2 minutes, so real-time updates are unnecessary.

**Solution:** I implemented a multi-faceted approach:

-   60-second polling interval as a baseline update frequency
-   Manual refresh button for users who want immediate updates
-   Client-side filtering to avoid API calls while searching
-   Caching of historical data to prevent redundant requests

```tsx
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
```

### Data Freshness vs. Performance

**Challenge:** Balancing the need for fresh cryptocurrency data with application performance.

**Solution:**

-   Implemented a configurable display limit (5/10/15/20 items) to reduce rendering load
-   Added timestamp display showing when data was last refreshed
-   Created visual loading states to maintain UI responsiveness during updates

### Search User Experience

**Challenge:** Creating a responsive search experience without overwhelming the API.

**Solution:**

-   Implemented immediate client-side filtering against already fetched cryptocurrencies
-   Added a clear button to quickly reset searches
-   Displayed helpful feedback when no results match the search term

```tsx
{filteredCryptos.length === 0 && !isLoading && (
  <div className="text-center py-12">
    <p className="text-gray-500 dark:text-gray-400">
      No cryptocurrencies found matching &quot;{searchTerm}&quot;
    </p>
  </div>
)}
```


## Feature Expansions

-   Portfolio tracking with saved cryptocurrencies
-   Price alerts and notifications
-   More detailed historical charts with timeframe options
-   Additional data points (volume, circulating supply, etc.)

## Technical Improvements

-   Server-side filtering and pagination
-   WebSocket integration for true real-time updates
-   Progressive Web App capabilities for offline support
-   More extensive error recovery strategies

## UI Enhancements

-   More detailed crypto information cards
-   Interactive charts with zoom capabilities
-   Customizable dashboard layouts
-   Animation and transition improvements