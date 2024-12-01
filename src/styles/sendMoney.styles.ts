import { StyleSheet } from "react-native";
import normalize from "../hooks/useNormalize";
import { theme } from "./theme";

/**
 * Styles for send money screen
 */
export const styles = StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
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
      fontFamily: theme.fontFamily.medium,
    },
    userNumber: {
      fontSize: normalize(12),
      color: theme.colors.darkGray,
      marginTop: normalize(5),
      fontFamily: theme.fontFamily.medium,
    },
    balanceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.lightGray,
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
      color: theme.colors.darkGray,
      fontFamily: theme.fontFamily.medium,
    },
    balanceAmount: {
      fontSize: normalize(15),
      fontWeight: "500",
      fontFamily: theme.fontFamily.medium,
    },
    amountContainer: {
      paddingVertical: normalize(10),
      backgroundColor: theme.colors.white,
    },
    amountInputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      alignSelf: "center",
      width: "95%",
      height: normalize(70),
      borderWidth: 2,
      borderRadius: normalize(8),
      backgroundColor: theme.colors.white,
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
      color: theme.colors.midGray,
    },
    amountInput: {
      fontSize: normalize(24),
      fontWeight: "400",
      textAlign: "right",
      marginRight: normalize(15),
      fontFamily: theme.fontFamily.medium,
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
      color: theme.colors.secondary,
      fontSize: normalize(11),
      fontFamily: theme.fontFamily.medium,
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
      color: theme.colors.darkGray,
      fontFamily: theme.fontFamily.medium,
    },
    feeTotal: {
      fontWeight: "500",
      fontFamily: theme.fontFamily.medium,
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
      fontFamily: theme.fontFamily.medium,
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
      fontFamily: theme.fontFamily.medium,
    },
  });