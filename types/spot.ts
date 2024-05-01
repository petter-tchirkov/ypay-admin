export interface Spot {
  spotSettings: null;
  name: string;
  description: string;
  address: string;
  chainId: number;
  qrCodes: null;
  id: number;
  createdAt: Date;
}

export interface SpotData {
  spotSettings: null;
  name: string;
  description: string;
  address: string;
  chainId: number;
  spotPosId: string;
  qrCodes: any[];
  requests: null;
  id: number;
  createdAt: Date;
}

export interface SpotOrder {
  requestStatus: number;
  amount: number;
  total: number;
  tips: number;
  tableId: number;
  spotPosId: number;
  spotId: number;
  personsCount: number;
  requestProducts: RequestProduct[];
  transactions: null;
  id: number;
  createdAt: Date;
}

export interface RequestProduct {
  productPosId: number;
  productName: string;
  price: number;
  qty: number;
  id: number;
  createdAt: Date;
}
