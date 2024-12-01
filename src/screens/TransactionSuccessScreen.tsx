import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

type TransactionSuccessScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "TransactionSuccess"
  >;
  route: RouteProp<RootStackParamList, "TransactionSuccess">;
};

export const TransactionSuccessScreen: React.FC<
  TransactionSuccessScreenProps
> = ({ navigation, route }) => {
  const { amount, fees, total } = route.params;
  const transactionId = "B899900032343";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <IconButton
          icon="arrow-left"
          size={24}
          style={{ position: "absolute", left: 15 }}
          onPress={() => navigation.goBack()}
        />
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <View style={styles.iconCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        <Text style={styles.successText}>Transaction completed</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            borderRadius: 10,
            borderColor: "#f5f5f5",
            borderWidth: 1,
          }}
        >
          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/userItem.jpg")}
              style={styles.avatar}
            />
          </View>

          {/* Amount */}
          <View style={styles.amountContainer}>
            <View style={{ marginBottom: 4, flexDirection: "row" }}>
              <Text style={styles.amountText}>- </Text>
              <Image
                source={require("../../assets/CurrencyBlack.png")}
                style={styles.currencyContainer}
              />
              <Text style={styles.amountText}>{amount.toFixed(3)}</Text>
            </View>
            <Text style={styles.moneyText}>Money sent</Text>
          </View>

          {/* Transaction Details */}
          <View style={styles.detailsContainer}>
            <View
              style={[
                styles.detailRow,
                {
                  borderTopWidth: 1,
                  borderTopColor: "#f5f5f5",
                },
              ]}
            >
              <Text style={styles.detailLabel}>Amount</Text>
              <View style={{ marginBottom: 4, flexDirection: "row" }}>
                <Text style={styles.detailValue}>- </Text>
                <Image
                  source={require("../../assets/CurrencyBlack.png")}
                  style={styles.currencyContainerSmall}
                />
                <Text style={styles.detailValue}>{amount.toFixed(3)}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fee</Text>
              <View style={{ marginBottom: 4, flexDirection: "row" }}>
                <Text style={styles.detailValue}>- </Text>
                <Image
                  source={require("../../assets/CurrencyBlack.png")}
                  style={styles.currencyContainerSmall}
                />
                <Text style={styles.detailValue}>{fees.toFixed(3)}</Text>
              </View>
            </View>

            <View style={[styles.detailRow, styles.totalRow]}>
              <Text style={styles.detailLabel}>Total</Text>
              <View style={{ marginBottom: 4, flexDirection: "row" }}>
                <Text style={styles.detailValue}>- </Text>
                <Image
                  source={require("../../assets/CurrencyBlack.png")}
                  style={styles.currencyContainerSmall}
                />
                <Text style={styles.detailValue}>{total.toFixed(3)}</Text>
              </View>
            </View>

            <View
              style={[
                styles.detailRow,
                {
                  borderTopWidth: 1,
                  borderTopColor: "#f5f5f5",
                },
              ]}
            >
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <Text style={styles.transactionId}>{transactionId}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Done Button */}
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.replace("SendMoney")}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  successIcon: {
    marginBottom: 16,
  },
  iconCircle: {
    marginTop: 10,
    marginBottom: 5,
    width: 74,
    height: 74,
    borderRadius: 36,
    backgroundColor: "#0EAA7E",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 50,
  },
  successText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 24,
    fontFamily:'Ubuntu-Bold'

  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 16,
    marginTop: 15,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  amountContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  amountText: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily:'Ubuntu-Bold'
  },
  moneyText: {
    fontSize: 14,
    color: "#666666",
    fontFamily:'Ubuntu-Light'
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
  totalRow: {
    borderBottomWidth: 0,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666666",
    fontFamily:'Ubuntu-Medium'
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily:'Ubuntu-Medium'
  },
  transactionId: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily:'Ubuntu-Medium'
  },
  doneButton: {
    margin: 16,
    height: 48,
    backgroundColor: "#ff5722",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily:'Ubuntu-Medium'
  },
  currencyContainer: {
    width: 15,
    height: 15,
    top: 6,
    marginLeft: 2,
    marginRight: 5,
  },
  currencyContainerSmall: {
    width: 9,
    height: 9,
    top: 4,
    marginLeft: 2,
    marginRight: 5,
  },
  currencySymbol: {
    width: "100%",
    height: "100%",
  },
});
