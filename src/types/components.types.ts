import { ImageSourcePropType, TextStyle, ViewStyle } from "react-native";

// Type definition for the props of the CustomButton component.
export interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?:boolean;
}
// Type definition for the props of the CustomHeader component.
export interface CustomHeaderProps {
  title: string;
  onBack?: () => void;
}

// Type definition for the props of the UserAvatar component.
export interface UserAvatarProps {
  source: ImageSourcePropType;
  size?: number;
  style?: ViewStyle;
}
