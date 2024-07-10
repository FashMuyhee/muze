import { COLORS } from '@utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat, withDelay, SharedValue } from 'react-native-reanimated';

const TypingBubble = () => {
  const dot1 = useSharedValue(1);
  const dot2 = useSharedValue(1);
  const dot3 = useSharedValue(1);

  const animateDot = (dot: SharedValue<number>, delay: number) => {
    dot.value = withDelay(delay, withRepeat(withTiming(1.4, { duration: 500, easing: Easing.inOut(Easing.quad) }), -1, true));
  };

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: dot1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: dot2.value }],
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [{ scale: dot3.value }],
  }));

  React.useEffect(() => {
    animateDot(dot1, 0);
    animateDot(dot2, 250);
    animateDot(dot3, 350);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, animatedStyle1]} />
      <Animated.View style={[styles.dot, animatedStyle2]} />
      <Animated.View style={[styles.dot, animatedStyle3]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.dark,
    marginHorizontal: 4,
  },
});

export default TypingBubble;
