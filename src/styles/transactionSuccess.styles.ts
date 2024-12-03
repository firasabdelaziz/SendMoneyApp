import { StyleSheet } from "react-native";
import normalize from "../hooks/useNormalize";
import { theme } from "./theme";

/**
 * Styles for transaction success money screen
 */
export const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: "center",
      paddingTop: normalize(40),
    },
    successIcon: {
      marginBottom: normalize(10),
    },
    iconCircle: {
      marginTop: normalize(10),
      marginBottom: normalize(5),
      width: normalize(74),
      height: normalize(74),
      borderRadius: normalize(36),
      backgroundColor: theme.colors.secondary,
      justifyContent: "center",
      alignItems: "center",
    },
    checkmark: {
      color: theme.colors.white,
      fontSize: normalize(50),
    },
    successText: {
      fontSize: normalize(18),
      fontWeight: "500",
      marginBottom: normalize(24),
      fontFamily: theme.fontFamily.bold,
    },
    avatarContainer: {
      width: normalize(70),
      height: normalize(70),
      borderRadius: normalize(60),
      overflow: "hidden",
      marginBottom: normalize(16),
      marginTop: normalize(15),
    },
    avatar: {
      width: "100%",
      height: "100%",
    },
    amountContainer: {
      alignItems: "center",
      marginBottom: normalize(16),
    },
    amountText: {
      fontSize: normalize(24),
      fontWeight: "500",
      fontFamily: theme.fontFamily.bold,
    },
    moneyText: {
      fontSize: normalize(14),
      color: theme.colors.gray,
      fontFamily: theme.fontFamily.light,
    },
    detailsContainer: {
      width: "100%",
      paddingHorizontal: normalize(16),
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: normalize(8),
    },
    totalRow: {
      borderBottomWidth: 0,
      marginBottom: normalize(12),
    },
    detailLabel: {
      fontSize: normalize(14),
      color: theme.colors.gray,
      fontFamily: theme.fontFamily.medium,
    },
    detailValue: {
      fontSize: normalize(14),
      fontWeight: "500",
      fontFamily: theme.fontFamily.medium,
    },
    transactionId: {
      fontSize: normalize(14),
      fontWeight: "500",
      fontFamily: theme.fontFamily.medium,
    },
    buttonContainer: {
      paddingHorizontal: normalize(16),
      paddingBottom: normalize(28),
    },
    currencyContainer: {
      width: normalize(15),
      height: normalize(15),
      top: normalize(6),
      marginLeft: normalize(2),
      marginRight: normalize(5),
    },
    currencyContainerSmall: {
      width: normalize(9),
      height: normalize(9),
      top: normalize(4),
      marginLeft: normalize(2),
      marginRight: normalize(5),
    },
    currencySymbol: {
      width: "100%",
      height: "100%",
    },
  });
  