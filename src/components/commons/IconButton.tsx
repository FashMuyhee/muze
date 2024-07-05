import { Pressable } from 'react-native';
import React from 'react';
import { IconButtonProps } from './types';

export const IconButton = ({
  icon,
  size = 40,
  onPress,
  style,
  disabled,
  rounded = true,
  bg,
}: IconButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      role="button"
      onPress={onPress}
      style={[
        {
          height: size,
          width: size,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: rounded ? size / 2 : 0,
          backgroundColor: bg,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
};
