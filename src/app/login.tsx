import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { COLORS } from '@constants';
import { Button, Text } from '@components';
import { onSignIn, onSignUp } from './hooks';
import TextField from '@components/commons/TextField';

type Props = {};

const Login = (props: Props) => {
  const { type } = useLocalSearchParams();
  const isLogin = type == 'login';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    <View style={styles.container}>
      <Image source={require('@assets/images/logo.png')} style={styles.logo} />
      <Text fontWeight="bold" fontSize={25} textAlign="center">
        {isLogin ? 'Welcome Back' : 'Create an Account'}
      </Text>

      <View style={{ flex: 1, marginTop: '10%' }}>
        <TextField placeholder="john@example.com" value={email} onChangeText={setEmail} isPassword={false} />
        <TextField placeholder="password" value={password} onChangeText={setPassword} isPassword />
        <Button onPress={onSubmit} isLoading={isLoading} text={isLogin ? 'Login' : 'Create Account'} style={{ marginTop: '10%' }} />
        <Text
          onPress={() => router.push({ pathname: '/login', params: { type: isLogin ? 'register' : 'login' } })}
          style={{ paddingVertical: 10 }}
          textAlign="center"
          color={COLORS.black}>
          {isLogin ? "Don't have an Account, Sign-Up" : 'Already have an Account,Sign-in'}
        </Text>
      </View>
    </View>
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
