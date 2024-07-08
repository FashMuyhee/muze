import { Text, Pressable } from 'react-native';
import React from 'react';
import { HorizontalPlacement, PopoverBaseRef, TooltipProps, VerticalPlacement } from './type';
import PopoverBase from './PopoverBase';
import { shadowStyle } from './util';

export const Tooltip: React.FC<TooltipProps> = ({
  tip,
  tipTextStyle,
  placement = [VerticalPlacement.ABOVE, HorizontalPlacement.CENTER],
  trigger,
  tipContainerStyle,
  onPressTip,
}) => {
  const ref = React.useRef<PopoverBaseRef>(null);

  const click = () => {
    ref.current?.onClose();
    if (onPressTip) {
      onPressTip();
    }
  };

  const renderTooltip = () => {
    return (
      <Pressable
        onPress={click}
        style={[{ maxWidth: 300, padding: 5, borderRadius: 5, backgroundColor: '#1b1b1b', ...shadowStyle }, tipContainerStyle]}>
        <Text style={[{ fontSize: 12, textAlign: 'center', color: 'white' }, tipTextStyle]}>{tip}</Text>
      </Pressable>
    );
  };
  return <PopoverBase ref={ref} popoverComponent={renderTooltip()} placement={placement} trigger={trigger} />;
};
