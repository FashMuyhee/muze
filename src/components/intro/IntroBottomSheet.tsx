import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SW } from '@utils/helpers';
import { COLORS } from '@utils';
import { Button } from '@components';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { onSocialSignin } from '@hook';

type Props = {};

export const IntroBottomSheet = (props: Props) => {
  const { submit: submitGoogle } = onSocialSignin('oauth_google');
  const { submit: submitGithub } = onSocialSignin('oauth_github');
  return (
    <View style={[styles.container]}>
      <Button
        bgColor="#EA4335"
        icon={<Ionicons name="logo-google" size={20} color={COLORS.light} />}
        textColor={COLORS.light}
        text="Continue with Google"
        onPress={submitGoogle}
      />
      <Button
        bgColor="white"
        icon={<Ionicons name="logo-github" size={20} />}
        textColor={COLORS.black}
        text="Continue with Github"
        onPress={submitGithub}
      />

      <Button
        bgColor={COLORS.dark}
        icon={<Ionicons name="mail" size={20} color={COLORS.light} />}
        textColor={COLORS.light}
        text="Sign-in with email"
        onPress={() => router.push({ pathname: '/login', params: { type: 'login' } })}
      />
      <Button
        bgColor={COLORS.dark}
        icon={<Ionicons name="mail" size={20} color={COLORS.light} />}
        textColor={COLORS.light}
        text="Sign-up with email"
        onPress={() => router.push({ pathname: '/login', params: { type: 'register' } })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SW,
    position: 'absolute',
    backgroundColor: COLORS.black,
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 25,
    rowGap: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 35,
  },
});
