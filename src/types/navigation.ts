import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SendMoney: undefined;
  TransactionSuccess: {
    amount: number;
    fees:number;
    total:number;
  };
};

export type SendMoneyScreenProps = NativeStackScreenProps<RootStackParamList, 'SendMoney'>;
export type TransactionSuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'TransactionSuccess'>;
