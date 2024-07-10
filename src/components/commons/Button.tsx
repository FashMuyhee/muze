import { TouchableNativeFeedback, StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';
import { ButtonProps } from './types';
import { Text } from './Text';
import { COLORS } from '@utils';

export const Button = ({
  onPress,
  text,
  isLoading,
  textColor = COLORS.light,
  bgColor = COLORS.primary,
  style,
  disabled = false,
  withIcon,
  icon,
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;

  const bg = React.useMemo(() => {
    if (disabled) return '#EAE7F2';
    return bgColor;
  }, [disabled, bgColor]);

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={isDisabled}>
      <View style={[styles.wrapper, { backgroundColor: bg }, style]}>
        {isLoading ? (
          <ActivityIndicator size="small" color={COLORS.light} />
        ) : (
          <>
            {icon}
            <Text textAlign="center" color={textColor} fontSize={15} fontWeight={withIcon ? 'regular' : 'bold'}>
              {isLoading ? 'Loading' : text}
            </Text>
          </>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 45,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    justifyContent: 'center',
  },
});
