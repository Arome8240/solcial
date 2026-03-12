import { useQuery } from '@tanstack/react-query';
import { dexScreenerService } from '@/services/dexscreener';
import { jupiterService } from '@/services/jupiter';
import { coinGeckoService } from '@/services/coingecko';

export function useTokenPrice(address: string, provider: 'dexscreener' | 'jupiter' = 'dexscreener') {
  return useQuery({
    queryKey: ['token-price', address, provider],
    queryFn: async () => {
      if (provider === 'jupiter') {
        const price = await jupiterService.getTokenPrice(address);
        return { price, address };
      }
      return dexScreenerService.getTokenByAddress(address);
    },
    enabled: !!address,
    refetchInterval: 30000, // 30 seconds
    staleTime: 20000, // 20 seconds
  });
}

export function useSOLPrice() {
  return useQuery({
    queryKey: ['sol-price'],
    queryFn: async () => {
      // Try CoinGecko first (free, no auth required)
      try {
        const coinGeckoPrice = await coinGeckoService.getSOLPrice();
        if (coinGeckoPrice > 0) {
          console.log('SOL price from CoinGecko:', coinGeckoPrice);
          return coinGeckoPrice;
        }
      } catch (error) {
        console.error('CoinGecko price fetch failed:', error);
      }
      
      // Fallback to DexScreener
      try {
        const dexPrice = await dexScreenerService.getSOLPrice();
        if (dexPrice > 0) {
          console.log('SOL price from DexScreener:', dexPrice);
          return dexPrice;
        }
      } catch (error) {
        console.error('DexScreener price fetch failed:', error);
      }
      
      // Last resort: Try Jupiter (may require auth)
      try {
        const jupiterPrice = await jupiterService.getTokenPrice('So11111111111111111111111111111111111111112');
        if (jupiterPrice > 0) {
          console.log('SOL price from Jupiter:', jupiterPrice);
          return jupiterPrice;
        }
      } catch (error) {
        console.error('Jupiter price fetch failed:', error);
      }
      
      console.warn('All price sources failed, returning 0');
      return 0;
    },
    refetchInterval: 30000,
    staleTime: 20000,
  });
}

export function useMultipleTokenPrices(addresses: string[]) {
  return useQuery({
    queryKey: ['token-prices', addresses.join(',')],
    queryFn: () => dexScreenerService.getMultipleTokenPrices(addresses),
    enabled: addresses.length > 0,
    refetchInterval: 30000,
    staleTime: 20000,
  });
}

export function useTrendingTokens() {
  return useQuery({
    queryKey: ['trending-tokens'],
    queryFn: () => dexScreenerService.getTrendingTokens(),
    refetchInterval: 60000, // 1 minute
    staleTime: 45000,
  });
}

export function useTokenSearch(query: string) {
  return useQuery({
    queryKey: ['token-search', query],
    queryFn: () => dexScreenerService.searchTokens(query),
    enabled: query.length > 2,
    staleTime: 30000,
  });
}

export function useJupiterQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['jupiter-quote', inputMint, outputMint, amount],
    queryFn: () => jupiterService.getQuote(inputMint, outputMint, amount),
    enabled: enabled && !!inputMint && !!outputMint && amount > 0,
    refetchInterval: 15000, // 15 seconds for swap quotes
    staleTime: 10000,
  });
}
