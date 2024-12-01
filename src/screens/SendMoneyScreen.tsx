import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { SendMoneyScreenProps } from "../types/navigation";
import Toast from "react-native-toast-message";
import toastConfig from "../components/ToastConfig";
import { useKeyboard } from "../hooks/useKeyboard";
import { useMoneyTransfer } from "../hooks/useMoneyTransfer";
import { CommonStyles } from "../styles/common";
import { theme } from "../styles/theme";
import { CustomHeader } from "../components/common/CustomHeader";
import { UserAvatar } from "../components/common/UserAvatar";
import { CustomButton } from "../components/common/CustomButton";
import { styles } from "../styles/sendMoney.styles";
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * SendMoneyScreen component to handle the money sending flow.
 * This screen allows the user to input an amount to send, displays
 * their balance, and calculates the associated fees and total amount.
 * It provides quick amount options and handles the sending of money.
 *
 * @returns {JSX.Element} The rendered component for sending money.
 */
export const SendMoneyScreen: React.FC<SendMoneyScreenProps> = () => {
  // Placeholder balance value
  const balance = 2500.0;

  // Hook to handle keyboard visibility and dismiss action
  const { keyboardVisible, dismissKeyboard } = useKeyboard();

  // Hook for managing the money transfer process
  const {
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
    loading
  } = useMoneyTransfer({ balance });

  /**
   * Focus the input field when amount container is pressed
   */
  const focusInput = () => {
    resetAmount();
    inputRef.current?.focus();
  };


  return (
    <SafeAreaView style={CommonStyles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.contentContainer}>
            {/* Header */}
            <CustomHeader
              title="Send money"
              onBack={() => {
                dismissKeyboard();
              }}
            />

            {/* User Info */}
            <View style={styles.userInfo}>
              <UserAvatar source={require("../../assets/userItem.jpg")} />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>Foulen Fouleni</Text>
                <Text style={styles.userNumber}>56 *** *10</Text>
              </View>
            </View>

            {/* Balance */}
            <View style={styles.balanceContainer}>
              <Ionicons name="wallet-outline" size={15} color="#818283" style={styles.balanceWallet}/>
              <Text style={styles.balanceLabel}>Balance: </Text>
              <Text style={styles.balanceAmount}>{newBalance.toFixed(3)} DT</Text>
            </View>

            {/* Amount Display */}
            <TouchableOpacity
              style={styles.amountContainer}
              onPress={focusInput}
              activeOpacity={1}
            >
              <View style={[styles.amountInputWrapper,{ 
                borderColor: keyboardVisible ? theme.colors.lightPrimary : theme.colors.lightGray,
               }]}>
                <View style={styles.currencyContainer}>
                  <Image
                    source={require("../../assets/Currency.png")}
                    style={styles.currencySymbol}
                  />
                </View>
                <TextInput
                  ref={inputRef}
                  style={[styles.amountInput,{
                    color : amount ==="0.000" ? theme.colors.midGray : theme.colors.black
                  }]}
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                  maxLength={10}
                  selectTextOnFocus
                  textAlign="center"
                />
              </View>
            </TouchableOpacity>

            {/* Discount Banner */}
            {showDiscountBanner && (
              <View style={styles.infoMessageContainer}>
                <Text style={styles.infoMessageText}>
                  Enjoy your first 20 DT of the day with a fee of 5 millimes.
                </Text>
              </View>
            )}

            {/* Fees and Total */}
            <View style={styles.feesContainer}>
              <View style={styles.feeRow}>
                <Text style={styles.feeFees}>Fees:</Text>
                <Text style={styles.feeFees}>{fees.toFixed(3)} DT</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeTotal}>Total:</Text>
                <Text style={styles.feeTotal}>{total.toFixed(3)} DT</Text>
              </View>
            </View>

            {/* Quick Amount Buttons */}
            {!keyboardVisible && (
              <View style={styles.quickAmounts}>
                {[10, 20, 50, 100].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.quickAmountButton,
                      {
                        backgroundColor:
                          value == selectedValue
                            ? "#FEF4E9"
                            : theme.colors.white,
                        borderColor:
                          value == selectedValue
                            ? "#F68E21"
                            : theme.colors.lightGray,
                      },
                    ]}
                    onPress={() => setQuickAmount(value)}
                  >
                    <Text
                      style={[
                        styles.quickAmountText,
                        {
                          color:
                            value == selectedValue
                              ? "#F68E21"
                              : theme.colors.black,
                        },
                      ]}
                    >
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>

        {/* Send Button */}
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.sendButtonContainer}>
            <CustomButton
              onPress={handleSend}
              title="Send money"
              disabled={amount === "0.000"}
              loading={loading}
              style={{
                backgroundColor:
                  amount === "0.000"
                    ? theme.colors.lightGray
                    : theme.colors.primary,
              }}
              textStyle={{
                color:
                  amount === "0.000"
                    ? theme.colors.disabledGray
                    : theme.colors.white,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};
