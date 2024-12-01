import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { CommonStyles } from "../../styles/common";
import { theme } from "../../styles/theme";
import { CustomButtonProps } from "../../types/components.types";
import { ActivityIndicator } from "react-native-paper";

/**
 * A customizable button component that triggers an action when pressed.
 *
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {string} title - The text to display on the button.
 * @param {boolean} [disabled=false] - Whether the button is disabled (optional).
 * @param {ViewStyle} [style] - Additional styles for the button container (optional).
 * @param {TextStyle} [textStyle] - Additional styles for the button text (optional).
 * @param {boolean} [loading=false] - Whether the button is in a loading state (optional).
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        CommonStyles.primaryButton,
        disabled && { backgroundColor: theme.colors.lightGray },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.white} />
      ) : (
        <Text
          style={[
            CommonStyles.primaryButtonText,
            disabled && { color: theme.colors.darkGray },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
