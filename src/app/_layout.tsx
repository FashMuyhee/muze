import { COLORS } from '@constants';
import { IS_ANDROID } from '@constants/utilts';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="(index)" screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ headerShown: false, navigationBarColor: COLORS.black, statusBarTranslucent: true }} />
      <Stack.Screen
        name="login"
        options={{
          statusBarStyle: IS_ANDROID ? 'dark' : undefined,
          title: '',
          statusBarColor: COLORS.light,
          navigationBarColor: COLORS.light,
          presentation: 'card',
          headerBackTitle: 'Intro',
          headerTintColor: COLORS.black,
          headerStyle: {
            backgroundColor: COLORS.light,
          },
        }}
      />
    </Stack>
  );
}
