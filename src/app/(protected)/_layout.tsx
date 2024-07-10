import { Platform } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '@utils';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@utils/Database';

type Props = {};

const Layout = (props: Props) => {
  return (
    <SQLiteProvider databaseName="muze.db" onInit={migrateDbIfNeeded}>
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
    </SQLiteProvider>
  );
};

export default Layout;
