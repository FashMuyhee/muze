import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '@constants/colors';
import { AnimatedIntro } from './components';

type Props = {};

const Intro = (props: Props) => {
  return (
    <View style={styles.container}>
      <AnimatedIntro />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Intro;
