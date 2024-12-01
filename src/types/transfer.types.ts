import {  TextInput } from "react-native";


// Defining the props for the useMoneyTransfer hook
export interface UseMoneyTransferProps {
  balance: number;
}

// Defining the return type for the useMoneyTransfer hook
export interface UseMoneyTransferReturn {
  amount: string;
  fees: number;
  total: number;
  selectedValue: number;
  showDiscountBanner: boolean;
  inputRef: React.RefObject<TextInput>;
  handleAmountChange: (text: string) => void;
  setQuickAmount: (value: number) => void;
  handleSend: () => void;
  resetAmount: () => void;
  loading:boolean;
}

