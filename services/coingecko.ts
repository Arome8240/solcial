class CoinGeckoService {
  private baseUrl = 'https://api.coingecko.com/api/v3';

  async getSOLPrice(): Promise<number> {
    try {
      const response = await fetch(
        `${this.baseUrl}/simple/price?ids=solana&vs_currencies=usd`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        console.error('CoinGecko API error:', response.status);
        return 0;
      }
      
      const data = await response.json();
      const price = data.solana?.usd || 0;
      
      console.log('CoinGecko SOL price:', price);
      return price;
    } catch (error) {
      console.error('CoinGecko price error:', error);
      return 0;
    }
  }

  async getTokenPrice(tokenAddress: string): Promise<number> {
    try {
      const response = await fetch(
        `${this.baseUrl}/simple/token_price/solana?contract_addresses=${tokenAddress}&vs_currencies=usd`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        return 0;
      }
      
      const data = await response.json();
      return data[tokenAddress.toLowerCase()]?.usd || 0;
    } catch (error) {
      console.error('CoinGecko token price error:', error);
      return 0;
    }
  }
}

export const coinGeckoService = new CoinGeckoService();
