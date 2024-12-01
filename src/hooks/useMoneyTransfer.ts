import { useState, useRef, useMemo } from 'react';
import { TextInput, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import Toast from 'react-native-toast-message';
import { calculateFees } from '../utils/fees';
import { UseMoneyTransferProps, UseMoneyTransferReturn } from '../types/transfer.types';



/**
 * Custom hook for managing the money transfer workflow.
 * 
 * This hook handles:
 * - Managing the transfer amount.
 * - Calculating fees dynamically based on the transfer amount.
 * - Validating the transfer amount against the user's balance.
 * - Providing utilities for quick-select amounts and resetting inputs.
 * - Integrating with navigation for transaction success handling.
 * - Displaying a discount banner for eligible amounts.
 * 
 * @param {UseMoneyTransferProps} props - The input properties for the hook.
 * @param {number} props.balance - The user's current balance used for validation.
 * 
 * @returns {UseMoneyTransferReturn} An object containing:
 * - `amount` (string): The current transfer amount as a formatted string.
 * - `fees` (number): The calculated transaction fees.
 * - `total` (number): The total amount (transfer + fees).
 * - `selectedValue` (number): The last quick-select amount.
 * - `showDiscountBanner` (boolean): Flag to indicate if the discount banner should be displayed.
 * - `inputRef` (React.RefObject<TextInput>): Reference to the TextInput element.
 * - `handleAmountChange` (function): Updates the amount based on user input.
 * - `setQuickAmount` (function): Sets the transfer amount via quick selection.
 * - `handleSend` (function): Initiates the send transaction after validation.
 * - `resetAmount` (function): Resets all transfer-related fields.
 * - `loading` (boolean): Indicates if the transaction is being processed.
 * - `newBalance` (number): The updated balance after the transaction.
 */
export const useMoneyTransfer = ({ balance }: UseMoneyTransferProps): UseMoneyTransferReturn => {
  const navigation = useNavigation<NavigationProp>();
  const inputRef = useRef<TextInput>(null);
  
  // State to manage the transfer amount, selected quick amount, and fees and loading state ,new balance
  const [amount, setAmount] = useState("0.000");
  const [selectedValue, setSelectedValue] = useState(0);
  const [fees, setFees] = useState(0);
  const [newBalance, setNewBalance] = useState(balance); 
  const [loading, setLoading] = useState(false);

  // Derived values
  const numericAmount = parseFloat(amount);
  const total = numericAmount + fees;
  const showDiscountBanner = numericAmount > 0 && numericAmount <= 20;

  /**
   * Memo to recalculate fees and balance whenever amount or fees change.
   * This ensures that the balance does not go negative.
   */
  useMemo(() => {
    // Calculate fees only when the amount changes and is non-zero
    if (amount !== "0.000") {
      const calculatedFees = calculateFees(numericAmount);
      setFees(calculatedFees);
    }

    // Calculate new balance and prevent it from going negative
    let updatedBalance = balance - total;
    if (updatedBalance < 0) {
      updatedBalance = 0;
    }

    setNewBalance(updatedBalance); // Update the new balance state
  }, [amount, fees, balance]); // Recalculate whenever `amount`, `fees`, or `balance` changes
  


  /**
   * Handler for manual changes to the amount input field.
   * Formats the input into a valid monetary value.
   */
  const handleAmountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setAmount("0.000");
      return;
    }

    const numberValue = parseInt(numericValue, 10);
    const formattedAmount = (numberValue / 1000).toFixed(3);
    setAmount(formattedAmount);
  };

  /**
   * Sets a quick-select amount and dismisses the keyboard.
   */
  const setQuickAmount = (value: number) => {
    setAmount(value.toFixed(3));
    setSelectedValue(value);
    Keyboard.dismiss();
  };

  /**
   * Resets the amount and related state to their initial values.
   */
  const resetAmount = () => {
    setAmount("0.000");
    setSelectedValue(0);
    setFees(0);
  };

  /**
   * Validates and initiates the send money process.
   * Displays a toast message if the balance is insufficient.
   * Navigates to the success screen on valid transactions.
   */
  const handleSend = () => {
    setLoading(true); // Set loading state to true when sending starts
    Keyboard.dismiss();

    if (total >= balance) {
      Toast.show({
        type: 'error',
        text1: 'Insufficient funds',
        position: 'top',
        visibilityTime: 3000,
      });
      setLoading(false); // Set loading state to false when the process ends
      return;
    }

    setTimeout(() => {
      navigation.navigate('TransactionSuccess', {
        amount: numericAmount,
        fees,
        total,
      }); 
      setLoading(false); // Set loading state to false after transaction is processed
    }, 1000);

  };

  return {
    newBalance,
    amount,
    fees,
    total,
    selectedValue,
    showDiscountBanner,
    inputRef,
    handleAmountChange,
    setQuickAmount,
    handleSend,
    resetAmount,
    loading, 
  };
};