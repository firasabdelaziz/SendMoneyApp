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
import normalize from "../hooks/useNormalize";
import toastConfig from "../components/ToastConfig";

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
      <Toast config={toastConfig}  />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: normalize(16),
    borderBottomWidth: 2,
    borderColor: "#f5f5f5",
    height: normalize(56),
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: normalize(18),
    fontWeight: "500",
    marginLeft: normalize(16),
    fontFamily: "Ubuntu-Medium",
  },
  userInfo: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(20),
    marginTop: normalize(25),
  },
  avatar: {
    position: "relative",
    width: normalize(60),
    height: normalize(60),
    borderRadius: normalize(30),
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
    marginLeft: normalize(12),
  },
  userName: {
    fontSize: normalize(16),
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
  userNumber: {
    fontSize: normalize(12),
    color: "#666666",
    marginTop: normalize(5),
    fontFamily: "Ubuntu-Medium",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: normalize(8),
    marginTop: normalize(45),
    marginHorizontal: normalize(90),
    borderRadius: normalize(15),
  },
  balanceWallet: {
    height: normalize(15),
    width: normalize(15),
    right: normalize(4),
  },
  balanceLabel: {
    fontSize: normalize(14),
    color: "#666666",
    fontFamily: "Ubuntu-Medium",
  },
  balanceAmount: {
    fontSize: normalize(15),
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
  amountContainer: {
    paddingVertical: normalize(10),
    backgroundColor: "#ffffff",
  },
  amountInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    alignSelf: "center",
    width: "95%",
    height: normalize(70),
    borderColor: "#f5f5f5",
    borderWidth: 2,
    borderRadius: normalize(8),
    backgroundColor: "#ffffff",
    paddingVertical: normalize(8),
  },
  currencyContainer: {
    width: normalize(20),
    height: normalize(20),
    marginLeft: normalize(15),
  },
  currencySymbol: {
    width: "100%",
    height: "100%",
    fontSize: normalize(16),
    color: "#999999",
  },
  amountInput: {
    fontSize: normalize(24),
    fontWeight: "400",
    textAlign: "right",
    marginRight: normalize(15),
    color: "#999999",
    fontFamily: "Ubuntu-Medium",
  },
  infoMessageContainer: {
    paddingHorizontal: normalize(10),
    backgroundColor: "#D1EFE661",
    borderRadius: normalize(8),
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    height: normalize(25),
  },
  infoMessageText: {
    color: "#0EAA7E",
    fontSize: normalize(11),
    fontFamily: "Ubuntu-Medium",
  },
  feesContainer: {
    marginTop: normalize(10),
    paddingHorizontal: normalize(20),
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalize(8),
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
    paddingHorizontal: normalize(35),
    marginTop: normalize(115),
  },
  quickAmountButton: {
    width: normalize(52),
    height: normalize(35),
    borderRadius: normalize(18),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAmountText: {
    fontSize: normalize(14),
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    marginHorizontal: normalize(16),
    marginTop: normalize(16),
    padding: normalize(8),
    borderRadius: normalize(8),
  },
  errorText: {
    flex: 1,
    color: "red",
    marginLeft: normalize(8),
    fontFamily: "Ubuntu-Medium",
  },
  sendButtonContainer: {
    paddingHorizontal: normalize(16),
    paddingBottom: normalize(32),
  },
  sendButton: {
    height: normalize(48),
    borderRadius: normalize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    fontSize: normalize(16),
    fontWeight: "500",
    fontFamily: "Ubuntu-Medium",
  },
});
