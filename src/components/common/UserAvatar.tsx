import React from "react";
import { View, Image } from "react-native";
import { CommonStyles } from "../../styles/common";
import normalize from "../../hooks/useNormalize";
import { UserAvatarProps } from "../../types/components.types";

/**
 * A customizable user avatar component that displays an image.
 * 
 * @param {ImageSourcePropType} source - The source of the avatar image.
 * @param {number} [size=60] - The size of the avatar (optional, default is 60).
 * @param {ViewStyle} [style] - Additional styles for the avatar container (optional).
 */
export const UserAvatar: React.FC<UserAvatarProps> = ({
  source,
  size = 60,
  style,
}) => {
  return (
    <View
      style={[
        CommonStyles.avatar,
        {
          width: normalize(size),
          height: normalize(size),
        },
        style,
      ]}
    >
      <Image source={source} style={CommonStyles.avatarImage} />
    </View>
  );
};
