export interface Transaction {
  id: string;
  amount: number;
  note?: string;
  timestamp: number;
  type: "send" | "receive";
}

export interface UserState {
  balance: number;
  transactions: Transaction[];
}

export interface TransferFormData {
  amount: number;
  note?: string;
}
