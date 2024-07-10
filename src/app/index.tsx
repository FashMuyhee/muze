import { View, StyleSheet } from 'react-native';
import React from 'react';
import { AnimatedIntro, IntroBottomSheet } from '@components/intro';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

type Props = {};

const Intro = (props: Props) => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(chat)/" />;
  }

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
