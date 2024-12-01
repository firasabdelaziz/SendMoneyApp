import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

// RootStackParamList defines the structure of the navigation parameters for each screen in your stack.
export type RootStackParamList = {
  SendMoney: undefined; // No parameters expected for the SendMoney screen
  TransactionSuccess: { // Parameters for the TransactionSuccess screen
    amount: number;  // The transaction amount
    fees: number;    // The transaction fees
    total: number;   // The total amount including fees
  };
};

// SendMoneyScreenProps uses NativeStackScreenProps to define the props for the SendMoney screen.
// It indicates that the SendMoney screen will not receive any parameters.
export type SendMoneyScreenProps = NativeStackScreenProps<RootStackParamList, 'SendMoney'>;

// TransactionSuccessScreenProps defines the props for the TransactionSuccess screen, expecting parameters
// for amount, fees, and total from RootStackParamList.
export type TransactionSuccessScreenProps = NativeStackScreenProps<RootStackParamList, 'TransactionSuccess'>;


// Defining the type for navigation
export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SendMoney'>;
