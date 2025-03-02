---
id: technology
title: Technology Stack
sidebar_position: 2
---

# Technology Stack

## My Approach

With only a few hours to complete this project, I had to make quick but effective technology choices. I focused on solutions that would allow me to build a functional, responsive cryptocurrency tracker without getting bogged down in configuration or boilerplate.

## Tech Stack Overview

### Next.js

I chose Next.js as my React framework because:

- I needed server-side rendering capabilities to improve initial load times
- Its file based routing system saved me significant development time
- Quick setup with `create-next-app` and built-in TypeScript support

Next.js allowed me to get a production-ready application up and running quickly without sacrificing performance.

### Tailwind CSS

For styling, I went with Tailwind CSS because:

- Its utility-first approach meant I could style components inline without context switching
- It eliminated the need to write and maintain custom CSS files
- The design system constraints helped maintain visual consistency despite rapid development

The combination with shadcn/UI components (as seen in my CryptoDashboard component) gave me a polished look with minimal effort.

### Zustand

For state management, I selected Zustand over other options because:

```typescript
// Snapshot of my Zustand store setup
export const useCryptoStore = create<CryptoState>((set, get) => ({
    cryptocurrencies: [],
    searchTerm: '',
    // ...more state

    fetchCryptocurrencies: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: { /* ... */ }
            });
            set({ cryptocurrencies: response.data, isLoading: false });
        } catch (error) {
            set({ error: /* ... */, isLoading: false });
        }
    },
    // ...more actions
}));
```

I needed a state solution that:

- Had minimal boilerplate so I could implement features quickly
- Didn't require wrapping my app in context providers
- Made it easy to handle both UI state and API data in one place
- Let me use selectors to optimize rendering performance

With the tight timeline, Redux would have been overkill, and Context API would have required too much setup for the complexity of state I needed to manage.

### Axios

I used Axios for API requests because:

- Its concise API made data fetching straightforward
- I could easily set up request configurations for the CoinGecko API

### API Integration

#### CoinGecko API

I integrated with CoinGecko's API for cryptocurrency data because:

- It offered all the data points I needed (prices, market cap, historical data)
- The free tier had reasonable rate limits for a demonstration project (30 requests/minute)
- The API is well-documented and reliable

### Data Fetching Approach

With limited development time, I implemented a pragmatic approach to data fetching:

- Initial data load when components mount
- 60-second polling interval for fresh data without overwhelming the API
- Simple caching for historical chart data to prevent redundant requests
- Client-side filtering for search to provide immediate feedback

### Rate Limiting Strategy

To respect API limits while keeping data fresh:

- I implemented simple time-based polling instead of real-time WebSockets
- Added a manual refresh option for users who want immediate updates
- Cached historical data by cryptocurrency ID to avoid redundant API calls

### State Management Implementation

#### Store Design

I structured my Zustand store to handle:

- Cryptocurrency data from API responses
- UI interaction state (search terms, selected cryptos)
- Loading and error states

This unified approach let me manage all related state in one place while keeping components clean and focused on rendering.

#### Component Data Flow

My components only subscribe to the specific pieces of state they need:

```typescript
const {
    cryptocurrencies,
    searchTerm,
    isLoading,
    error,
    fetchCryptocurrencies,
    setSearchTerm,
} = useCryptoStore();
```

This selective state consumption helped prevent unnecessary re-renders and kept the application responsive even while fetching new data.

### Why Not Other Options?

Given my time constraints:

- React Query would have been great for data fetching, but I needed a solution that handled UI state too
- Redux would have required too much boilerplate for a quick project
- Context API alone would have been verbose for the state complexity I needed

Zustand gave me the perfect balance of simplicity and power for a fast-paced project.