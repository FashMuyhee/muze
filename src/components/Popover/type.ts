import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface BaseProps {
  placement?: [VerticalPlacement, HorizontalPlacement];
  trigger: React.ReactNode;
}
export interface PopoverBaseProps extends BaseProps {
  popoverComponent: React.ReactNode;
}

export interface PopoverBaseRef {
  onClose: () => void;
}
export interface PopoverBaseModalProps extends Omit<BaseProps, 'trigger'> {
  position: PopoverPosition;
  onClose: () => void;
  isVisible: boolean;
  popoverComponent: React.ReactNode;
}

export interface TooltipProps extends BaseProps {
  tip: string;
  tipTextStyle?: StyleProp<TextStyle>;
  tipContainerStyle?: StyleProp<
    Pick<ViewStyle, 'backgroundColor' | 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation' | 'borderRadius'>
  >;
  onPressTip?: () => void;
}

export type MenuItem = {
  onPress?: () => void;
  label: string;
  icon?: React.ReactNode;
};

export interface MenuItemProps {
  item: MenuItem;
  hasDivider: boolean;
  dividerColor?: string;
  iconPlacement?: 'left' | 'right';
  labelTextStyle?: StyleProp<TextStyle>;
}
export interface DropdownMenuProps extends BaseProps, Omit<MenuItemProps, 'item' | 'hasDivider'> {
  menuItems: MenuItem[];
  backgroundColor?: string;
  borderRadius?: number;
}
export interface TooltipProps extends BaseProps {
  tip: string;
  tipTextStyle?: StyleProp<TextStyle>;
  tipContainerStyle?: StyleProp<
    Pick<ViewStyle, 'backgroundColor' | 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation' | 'borderRadius'>
  >;
  onPressTip?: () => void;
}

export type PopoverPosition = {
  targetHeight: number;
  pageY: number;
  pageX: number;
  targetWidth: number;
};

export type PopoverLayoutSize = {
  height: number;
  width: number;
};

export enum VerticalPlacement {
  ABOVE = 'top',
  BELOW = 'bottom',
}

export enum HorizontalPlacement {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}
