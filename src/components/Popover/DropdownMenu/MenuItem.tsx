import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { MenuItemProps } from '../type';

const MenuItem = ({ item, hasDivider, dividerColor, iconPlacement = 'right', labelTextStyle }: MenuItemProps) => {
  return (
    <Pressable
      onPress={item.onPress}
      style={{
        flexDirection: iconPlacement == 'right' ? 'row' : 'row-reverse',
        justifyContent: 'space-between',
        padding: 7,
        alignItems: 'center',
        borderBottomWidth: hasDivider ? StyleSheet.hairlineWidth : 0,
        backgroundColor: 'transparent',
        borderBottomColor: dividerColor,
        columnGap: 10,
      }}>
      <Text style={[{ fontSize: 14, color: 'black', flex: 1 }, labelTextStyle]}>{item.label}</Text>
      {item.icon && <View style={{ width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>{item.icon}</View>}
    </Pressable>
  );
};

export default MenuItem;
