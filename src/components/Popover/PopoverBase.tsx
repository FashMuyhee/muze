import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { PopoverPosition, PopoverBaseProps, PopoverBaseRef } from './type';
import PopoverBaseModal from './PopoverBaseModal';

const PopoverBase: React.ForwardRefRenderFunction<PopoverBaseRef, PopoverBaseProps> = (props, ref) => {
  const { trigger, triggerBy = 'touchPress', ...rest } = props;
  const [isVisible, setIsVisible] = React.useState(false);
  const [popoverPosition, setPopoverPosition] = React.useState<PopoverPosition>({ pageY: 0, targetHeight: 0, pageX: 0, targetWidth: 0 });
  const dropdownRef = React.useRef<TouchableOpacity>(null);

  const handleToggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, w, height, pX, pY) => {
        setPopoverPosition({ pageY: pY, targetHeight: height, pageX: pX, targetWidth: w });
        setIsVisible(!isVisible);
      });
    }
  };

  // exposed toggle via ref
  React.useImperativeHandle(
    ref,
    () => ({
      onClose: handleToggleDropdown,
    }),
    [isVisible],
  );

  return (
    <View>
      {/* TRIGGER COMPONENT */}
      <TouchableOpacity
        ref={dropdownRef}
        activeOpacity={0.7}
        style={styles.trigger}
        accessibilityRole="menubar"
        onLongPress={() => {
          if (triggerBy === 'longPress') {
            handleToggleDropdown();
          }
        }}
        onPress={() => {
          if (triggerBy === 'touchPress') {
            handleToggleDropdown();
          }
        }}>
        {trigger}
      </TouchableOpacity>
      {/* POPOVER COMPONENT */}
      <PopoverBaseModal onClose={handleToggleDropdown} position={popoverPosition} isVisible={isVisible} {...rest} />
    </View>
  );
};

export default React.forwardRef(PopoverBase);

const styles = StyleSheet.create({
  trigger: {
    display: 'flex',
  },
});
