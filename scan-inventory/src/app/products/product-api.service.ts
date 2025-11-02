export interface ApiQuote {
  id: number;
  quote: string;
  author: string;
}

export class QuoteApi {
  base = 'https://dummyjson.com';

  async getQuotes(limit = 30, skip = 0): Promise<ApiQuote[]> {
    const url = `${this.base}/quotes?limit=${limit}&skip=${skip}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET /quotes failed: ${res.status}`);
    const data = await res.json();
    return (data && data.quotes) ? data.quotes as ApiQuote[] : [];
  }

  async getQuote(id: number): Promise<ApiQuote> {
    const res = await fetch(`${this.base}/quotes/${id}`);
    if (!res.ok) throw new Error(`GET /quotes/${id} failed: ${res.status}`);
    return await res.json();
  }
}