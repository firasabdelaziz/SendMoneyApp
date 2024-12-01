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
import normalize from "../hooks/useNormalize";

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
    paddingTop: normalize(16),
    paddingHorizontal: normalize(16),
    alignItems: "center",
  },
  headerText: {
    fontSize: normalize(18),
    fontWeight: "500",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: normalize(40),
  },
  successIcon: {
    marginBottom: normalize(16),
  },
  iconCircle: {
    marginTop: normalize(10),
    marginBottom: normalize(5),
    width: normalize(74),
    height: normalize(74),
    borderRadius: normalize(36),
    backgroundColor: "#0EAA7E",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: normalize(50),
  },
  successText: {
    fontSize: normalize(18),
    fontWeight: "500",
    marginBottom: normalize(24),
    fontFamily: 'Ubuntu-Bold'
  },
  avatarContainer: {
    width: normalize(70),
    height: normalize(70),
    borderRadius: normalize(50),
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
    marginBottom: normalize(32),
  },
  amountText: {
    fontSize: normalize(24),
    fontWeight: "500",
    fontFamily: 'Ubuntu-Bold'
  },
  moneyText: {
    fontSize: normalize(14),
    color: "#666666",
    fontFamily: 'Ubuntu-Light'
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: normalize(16),
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: normalize(7),
  },
  totalRow: {
    borderBottomWidth: 0,
    marginBottom: normalize(12),
  },
  detailLabel: {
    fontSize: normalize(14),
    color: "#666666",
    fontFamily: 'Ubuntu-Medium'
  },
  detailValue: {
    fontSize: normalize(14),
    fontWeight: "500",
    fontFamily: 'Ubuntu-Medium'
  },
  transactionId: {
    fontSize: normalize(14),
    fontWeight: "500",
    fontFamily: 'Ubuntu-Medium'
  },
  doneButton: {
    margin: normalize(16),
    height: normalize(48),
    backgroundColor: "#ff5722",
    borderRadius: normalize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    color: "#ffffff",
    fontSize: normalize(16),
    fontWeight: "500",
    fontFamily: 'Ubuntu-Medium'
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