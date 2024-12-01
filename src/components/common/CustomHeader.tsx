import React from "react";
import { IconButton } from "react-native-paper";
import { CommonStyles } from "../../styles/common";
import { Text, View } from "react-native";
import { CustomHeaderProps } from "../../types/components.types";

/**
 * A customizable header component that optionally displays a back button.
 *
 * @param {string} title - The title to display in the header.
 * @param {function} [onBack] - The function to be called when the back button is pressed (optional).
 */
export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onBack,
}) => {
  const haveTitle = title !== "";
  return (
    <View style={[haveTitle && CommonStyles.header]}>
      {onBack && (
        <IconButton
          icon="arrow-left"
          size={24}
          style={{ position: "absolute", left: 15 }}
          onPress={onBack}
        />
      )}
      {haveTitle && <Text style={CommonStyles.headerTitle}>{title}</Text>}
    </View>
  );
};
