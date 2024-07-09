import { Platform } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '@constants';

type Props = {};

const Layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
          statusBarStyle: Platform.select({ android: 'dark', ios: undefined }),
          navigationBarColor: COLORS.light,
          statusBarColor: COLORS.light,
        }}
      />
    </Stack>
  );
};

export default Layout;
