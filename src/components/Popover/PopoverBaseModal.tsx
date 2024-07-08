import { StyleSheet, Modal, Pressable, StyleProp, ViewStyle, View } from 'react-native';
import React from 'react';
import { HorizontalPlacement, PopoverBaseModalProps, PopoverLayoutSize, VerticalPlacement } from './type';
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { EXTRA_SPACING, flipPlacement, SCREEN_HEIGHT, SCREEN_WIDTH } from './util';
import { useVerticalPlacement, useGetVerticalPosition, useHorizontalPlacement } from './hooks';

const PopoverBaseModal = ({
  position: { pageY, targetHeight, pageX, targetWidth },
  onClose,
  isVisible,
  placement = [VerticalPlacement.BELOW, HorizontalPlacement.CENTER],
  popoverComponent,
}: PopoverBaseModalProps) => {
  const [shouldRender, setShouldRender] = React.useState(false);
  const animatedValue = useSharedValue(0);
  const [layout, setLayout] = React.useState<PopoverLayoutSize>({
    height: 0,
    width: 0,
  });
  const [verticalPlacement, horizontalPlacement] = placement;

  const { B_POS, T_POS } = useGetVerticalPosition({
    targetHeight,
    targetYPosition: pageY,
  });

  const _verticalPlacement = useVerticalPlacement({
    placement: verticalPlacement,
    targetYPosition: pageY,
    objectHeight: layout.height,
    targetH: targetHeight,
  });
  const _horizontalPlacement = useHorizontalPlacement({ placement: horizontalPlacement, objectWidth: layout.width, targetXPosition: pageX });

  /**
   * style variable for vertical placement
   */
  const verticalPlacementStyle: StyleProp<ViewStyle> = _verticalPlacement === VerticalPlacement.ABOVE ? { bottom: T_POS } : { top: B_POS };

  /**
   *  style variable for horizontal placement
   */
  const horizontalPlacementStyle = React.useMemo<StyleProp<ViewStyle>>(() => {
    switch (_horizontalPlacement) {
      case HorizontalPlacement.LEFT:
        return { right: SCREEN_WIDTH - pageX - targetWidth };
      case HorizontalPlacement.RIGHT:
        return { left: pageX };
      case HorizontalPlacement.CENTER:
      default:
        return { left: pageX + (targetWidth / 2 - layout.width / 2) };
    }
  }, [_horizontalPlacement, pageX, layout.width]);

  /**
   * transform origin styling based on popover placement
   */
  const transformOrigin = React.useMemo(() => {
    const yOrigin = flipPlacement(_verticalPlacement);
    const xOrigin = flipPlacement(_horizontalPlacement);

    if (_horizontalPlacement == HorizontalPlacement.CENTER) {
      return { transformOrigin: yOrigin };
    }

    return { transformOrigin: `${yOrigin} ${xOrigin}` };
  }, [_horizontalPlacement, _verticalPlacement]);

  /**
   * handles the popover scale animation
   */
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedValue.value }],
      opacity: interpolate(animatedValue.value, [0, 0.4, 1], [0, 1, 1]),
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      animatedValue.value = withSpring(1, {
        mass: 1,
        damping: 21,
        stiffness: 240,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
        reduceMotion: ReduceMotion.System,
      });
    } else {
      animatedValue.value = withTiming(0, { duration: 300, easing: Easing.elastic(1) }, (isFinished) => {
        if (isFinished) {
          runOnJS(setShouldRender)(false);
        }
      });
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <Modal visible transparent statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Animated.View style={[styles.popoverContainer, verticalPlacementStyle, horizontalPlacementStyle]}>
          <Animated.View
            style={[styles.popover, animatedStyle, transformOrigin]}
            onLayout={({ nativeEvent: { layout } }) => {
              setLayout(layout);
            }}>
            {popoverComponent}
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default PopoverBaseModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  popoverContainer: {
    zIndex: 1000,
    position: 'absolute',
  },
  popover: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
