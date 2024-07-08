import { View } from 'react-native';
import React from 'react';
import { DropdownMenuProps, HorizontalPlacement, PopoverBaseRef, VerticalPlacement } from '../type';
import PopoverBase from '../PopoverBase';
import { BORDER_RADIUS, shadowStyle } from '../util';
import MenuItem from './MenuItem';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menuItems,
  backgroundColor = '#fafafa',
  borderRadius = BORDER_RADIUS,
  dividerColor = '#8a8b8e',
  iconPlacement,
  labelTextStyle,
  placement = [VerticalPlacement.BELOW, HorizontalPlacement.LEFT],
  ...rest
}) => {
  const ref = React.useRef<PopoverBaseRef>(null);

  const onItemPress = (callback: () => void) => {
    ref.current?.onClose();
    if (callback) {
      callback();
    }
  };

  /**
   * renders menu items with map
   */
  const renderMenuItems = () => {
    return (
      <View style={{ backgroundColor, borderRadius, maxWidth: 250, minWidth: 150, ...shadowStyle }}>
        {menuItems &&
          menuItems.map((item, index) => {
            return (
              <MenuItem
                dividerColor={dividerColor}
                item={{ ...item, onPress: () => onItemPress(item.onPress!) }}
                key={`menu${item.label}_${index}`}
                hasDivider={index != menuItems.length - 1}
                iconPlacement={iconPlacement}
                labelTextStyle={labelTextStyle}
              />
            );
          })}
      </View>
    );
  };
  return <PopoverBase ref={ref} popoverComponent={renderMenuItems()} placement={placement} {...rest} />;
};
