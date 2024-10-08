import { View, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { COLORS } from '@utils';
import { Button, Text, TextField } from '@components';
import { onSignIn, onSignUp } from '@hook';

type Props = {};

const Login = (props: Props) => {
  const { type } = useLocalSearchParams();
  const isLogin = type == 'login';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const ref = React.useRef<TextInput>(null);

  const { isLoading: signingIn, submit: signIn } = onSignIn({ email, password });
  const { isLoading: signingUp, submit: signUp } = onSignUp({ email, password });

  const isLoading = signingIn || signingUp;

  const onSubmit = () => {
    if (isLogin) {
      signIn();
      return;
    }
    signUp();
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={styles.container}>
      <Image source={require('@assets/images/logo.png')} style={styles.logo} />
      <Text fontWeight="bold" fontSize={25} textAlign="center">
        {isLogin ? 'Welcome Back' : 'Create an Account'}
      </Text>

      <View style={{ flex: 1, marginTop: '10%' }}>
        <TextField onSubmit={() => ref.current?.focus()} placeholder="john@example.com" value={email} onChangeText={setEmail} isPassword={false} />
        <TextField isSubmittingField ref={ref} onSubmit={onSubmit} placeholder="password" value={password} onChangeText={setPassword} isPassword />
        <Button onPress={onSubmit} isLoading={isLoading} text={isLogin ? 'Login' : 'Create Account'} style={{ marginTop: '10%' }} />
        <Text
          onPress={() => router.push({ pathname: '/login', params: { type: isLogin ? 'register' : 'login' } })}
          style={{ paddingVertical: 10 }}
          textAlign="center"
          color={COLORS.black}>
          {isLogin ? "Don't have an Account, Sign-Up" : 'Already have an Account,Sign-in'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
    paddingHorizontal: 25,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    marginTop: '20%',
    alignSelf: 'center',
  },
});
