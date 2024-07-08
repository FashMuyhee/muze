import { View, StyleSheet } from 'react-native';
import React from 'react';
import { AnimatedIntro, IntroBottomSheet } from '@components/intro';

type Props = {};

const Intro = (props: Props) => {
  return (
    <View style={styles.container}>
      <AnimatedIntro />
      <IntroBottomSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Intro;
