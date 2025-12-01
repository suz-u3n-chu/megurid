export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ImageSize = '1K' | '2K' | '4K';

export enum ViewState {
  HOME = 'HOME',
  GENERATE = 'GENERATE',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL' // Placeholder for future
}
