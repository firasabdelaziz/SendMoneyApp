import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Toast from "react-native-toast-message";

type SendMoneyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SendMoney"
>;

const calculateFees = (amount: number): number => {
  if (amount <= 20) {
    return 0.005; // 5 millimes for amounts <= 20 TND
  }
  const fee = amount * 0.01; // 1% for amounts > 20 TND
  console.log("here", Math.min(fee, 3));

  return Math.min(fee, 3); // Cap at 3 TND
};

export const SendMoneyScreen = () => {
  const navigation = useNavigation<SendMoneyScreenNavigationProp>();
  const [amount, setAmount] = useState("0.000");
  const [selectedValue, setSelectedValue] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [fees, setFees] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const balance = 2500.0;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleAmountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setAmount("0.000");
      setFees(0);
      return;
    }

    const numberValue = parseInt(numericValue, 10);
    const formattedAmount = (numberValue / 1000).toFixed(3);
    setAmount(formattedAmount);

    // Calculate fees based on the new amount
    const calculatedFees = calculateFees(parseFloat(formattedAmount));
    setFees(calculatedFees);
  };

  const handleSend = () => {
    Keyboard.dismiss();
    const numAmount = parseFloat(amount);
    const total = numAmount + fees;

    if (total > balance) {
      Toast.show({
        type: "error",
        text1: "Insufficient funds",
        position: "top",
        visibilityTime: 3000,
      });
    } else {
      navigation.navigate("TransactionSuccess", {
        amount: parseFloat(amount),
        fees: fees,
        total: total,
      });
    }
  };

  const focusInput = () => {
    setAmount("0.000");
    setSelectedValue(0);
    setFees(0);
    inputRef.current?.focus();
  };

  const showDiscountBanner = parseFloat(amount) > 0 && parseFloat(amount) <= 20;
  const total = parseFloat(amount) + fees;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
              <IconButton
                icon="arrow-left"
                size={24}
                style={{ position: "absolute", left: 15 }}
                onPress={() => {
                  dismissKeyboard();
                  //navigation.goBack();
                }}
              />
              <Text style={styles.headerTitle}>Send money</Text>
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Image
                  source={require("../../assets/userItem.jpg")}
                  style={styles.avatarText}
                />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>Foulen Fouleni</Text>
                <Text style={styles.userNumber}>56 *** *10</Text>
              </View>
            </View>

            {/* Balance */}
            <View style={styles.balanceContainer}>
              <Image
                source={require("../../assets/wallet.png")}
                style={styles.balanceWallet}
              />
              <Text style={styles.balanceLabel}>Balance: </Text>
              <Text style={styles.balanceAmount}>{balance.toFixed(3)} DT</Text>
            </View>

            {/* Amount Display */}
            <TouchableOpacity
              style={styles.amountContainer}
              onPress={focusInput}
              activeOpacity={1}
            >
              <View style={styles.amountInputWrapper}>
                <View style={styles.currencyContainer}>
                  <Image
                    source={require("../../assets/Currency.png")}
                    style={styles.currencySymbol}
                  />
                </View>
                <TextInput
                  ref={inputRef}
                  style={styles.amountInput}
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
                <Text style={styles.feeTotal}>{amount} DT</Text>
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
                          value == selectedValue ? "#FEF4E9" : "#ffffff",
                        borderColor:
                          value == selectedValue ? "#F68E21" : "#f5f5f5",
                      },
                    ]}
                    onPress={() => {
                      setAmount(value.toFixed(3));
                      // Calculate fees based on the new amount
                      const calculatedFees = calculateFees(
                        parseFloat(value.toFixed(3))
                      );
                      setFees(calculatedFees);
                      setSelectedValue(value);
                      dismissKeyboard();
                    }}
                  >
                    <Text
                      style={[
                        styles.quickAmountText,
                        {
                          color: value == selectedValue ? "#F68E21" : "#000000",
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
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: amount === "0.000" ? "#f5f5f5" : "#ff5722",
                },
              ]}
              onPress={handleSend}
              disabled={amount === "0.000"}
            >
              <Text
                style={[
                  styles.sendButtonText,
                  {
                    color: amount === "0.000" ? "#B4B5B6" : "#ffffff",
                  },
                ]}
              >
                Send money
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (styles remain the same as in the previous version)
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: "#f5f5f5",
    height: 56,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 16,
    fontFamily: "Ubuntu-Medium",
  },
  userInfo: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
  },
  avatar: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  userDetails: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
  userNumber: {
    fontSize: 12,
    color: "#666666",
    marginTop: 5,
    fontFamily: "Ubuntu-Medium",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    marginTop: 45,
    marginHorizontal: 90,
    borderRadius: 15,
  },
  balanceWallet: {
    height: 15,
    width: 15,
    right: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Ubuntu-Medium",
  },
  balanceAmount: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
  amountContainer: {
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  amountInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    alignSelf: "center",
    width: "95%",
    height: 70,
    borderColor: "#f5f5f5",
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingVertical: 8,
  },
  currencyContainer: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  currencySymbol: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    color: "#999999",
  },
  amountInput: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "right",
    marginRight: 15,
    color: "#999999",
    fontFamily: "Ubuntu-Medium",
  },
  infoMessageContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#D1EFE661",
    borderRadius: 8,
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    height: 25,
  },
  infoMessageText: {
    color: "#0EAA7E",
    fontSize: 11,
    fontFamily: "Ubuntu-Medium",
  },
  feesContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  feeFees: {
    color: "#666666",
    fontFamily: "Ubuntu-Medium",
  },
  feeTotal: {
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
  quickAmounts: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 35,
    marginTop: 115,
  },
  quickAmountButton: {
    width: 52,
    height: 35,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
  },
  errorText: {
    flex: 1,
    color: "red",
    marginLeft: 8,
    fontFamily: "Ubuntu-Medium",
  },
  sendButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sendButton: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
});
