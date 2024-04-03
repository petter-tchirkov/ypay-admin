import type { Spot } from './spot';

export interface Chain {
  name: string;
  spots: null;
  userId: number;
  id: number;
  createdAt: Date;
}

export interface ChainData {
  name: string;
  spots: Spot[];
  userId: number;
  id: number;
  createdAt: Date;
}
