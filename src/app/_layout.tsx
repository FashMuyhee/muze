import { COLORS } from '@utils';
import { IS_ANDROID } from '@utils/helpers';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inProtectedGroup = segments[0] === '(protected)';

    if (isSignedIn && !inProtectedGroup) {
      router.replace('/0');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!fontLoaded || !isLoaded) {
    return <Slot />;
  }

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
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
