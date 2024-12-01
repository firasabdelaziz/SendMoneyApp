import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, Transaction } from '../../types/transfer.types';

const initialState: UserState = {
  balance: 2500.000,
  transactions: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    sendMoney: (state, action: PayloadAction<Omit<Transaction, 'id' | 'timestamp' | 'type'>>) => {
      const transaction: Transaction = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        type: 'send',
        ...action.payload,
      };
      
      state.balance -= action.payload.amount;
      state.transactions.unshift(transaction);
    },
    resetBalance: (state) => {
      state.balance = 2500.000;
    },
  },
});

export const { sendMoney, resetBalance } = userSlice.actions;
export default userSlice.reducer;

