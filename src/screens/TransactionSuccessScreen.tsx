import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from "react-native";
import { Text } from "react-native-paper";
import {  TransactionSuccessScreenProps } from "../types/navigation";
import normalize from "../hooks/useNormalize";
import { theme } from "../styles/theme";
import { CustomHeader } from "../components/common/CustomHeader";
import { CommonStyles } from "../styles/common";
import { CustomButton } from "../components/common/CustomButton";
import { UserAvatar } from "../components/common/UserAvatar";
import { styles } from "../styles/transactionSuccess.styles";


/**
 * TransactionSuccessScreen component to display the details of a completed transaction.
 * This screen shows a success message, transaction details (amount, fees, total), and 
 * a transaction ID. It also includes a button to return to the SendMoney screen.
 * 
 * @param {TransactionSuccessScreenProps} props - The props passed to the component, including navigation and route parameters.
 * @returns {JSX.Element} The rendered component for displaying the transaction success screen.
 */
export const TransactionSuccessScreen: React.FC<
  TransactionSuccessScreenProps
> = ({ navigation, route }) => {

  // Destructure the route parameters to extract the transaction details (amount, fees, total)
  const { amount, fees, total } = route.params;

  // transaction ID
  const transactionId = "B899900032343";

  return (
    <SafeAreaView style={CommonStyles.container}>
      <StatusBar barStyle="dark-content" />

      <CustomHeader title="" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
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
            borderRadius: normalize(10),
            borderColor: theme.colors.lightGray,
            borderWidth: 2,
          }}
        >
          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            <UserAvatar
              source={require("../../assets/userItem.jpg")}
              size={70}
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
                  borderTopColor: theme.colors.lightGray,
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
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Done"
          onPress={() => navigation.replace("SendMoney")}
        />
      </View>
    </SafeAreaView>
  );
};

