import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps {
  onPress?: () => void;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  textColor?: string;
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
  withIcon?: boolean;
  icon?: React.ReactElement;
}

export interface TextProps {
  children?: string | undefined | React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: number;
  textAlign?: TextStyle['textAlign'];
  textTransform?: TextStyle['textTransform'];
  onPress?: () => void;
  truncate?: boolean;
  numberLines?: number;
}

export interface IconButtonProps {
  icon: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  rounded?: boolean;
  bg?: string;
}

export type TextInputType = 'text' | 'password' | 'email' | 'url';

export interface TextFieldProps {
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  isPassword: boolean;
  onSubmit: () => void;
  isSubmittingField?: boolean;
}
