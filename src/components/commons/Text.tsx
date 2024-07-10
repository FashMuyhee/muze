import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './types';
import { COLORS } from '@utils';

export const Text: React.FunctionComponent<TextProps> = ({
  style,
  children,
  fontWeight = 'regular',
  fontSize = 14,
  color = COLORS.dark,
  textAlign,
  textTransform,
  onPress,
  truncate,
  numberLines,
}: TextProps) => {
  // const fontFamily = React.useMemo(() => {
  //   switch (fontWeight) {
  //     case 'bold':
  //       return FONTS.BOLD;
  //     case 'medium':
  //       return FONTS.MEDIUM;
  //     case 'regular':
  //       return FONTS.REGULAR;
  //   }
  // }, [fontWeight]);

  // color = !!color ? color : COLORS.BLACK;

  return (
    <RNText
      onPress={onPress}
      style={[{ textTransform, color, fontSize, textAlign, fontWeight }, style]}
      numberOfLines={truncate ? (numberLines ? numberLines : 1) : numberLines}
      lineBreakMode="tail"
      textBreakStrategy="simple"
      ellipsizeMode="tail">
      {children}
    </RNText>
  );
};
