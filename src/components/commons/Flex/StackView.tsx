import {View} from 'react-native';
import React from 'react';
import {FlexViewProps} from './type';

export const StackView: React.FC<FlexViewProps> = ({direction = 'row', align, justify, children, ...props}) => {
  return <View style={[{justifyContent: justify, alignItems: align, flexDirection: direction}, props.style]}>{children}</View>;
};
