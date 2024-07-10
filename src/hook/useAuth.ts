import { useSignIn, useSignUp, useOAuth, UseOAuthFlowParams } from '@clerk/clerk-expo';
import React from 'react';
import Snackbar from 'react-native-snackbar';

type Form = {
  email: string;
  password: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmailValid = (email: string) => emailRegex.test(email);

export const onSignIn = (body: Form) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    if (isEmailValid(body.email)) {
      try {
        const completeSignIn = await signIn.create({
          identifier: body.email,
          password: body.password,
        });

        // This indicates the user is signed in
        await setActive({ session: completeSignIn.createdSessionId });
      } catch (err: any) {
        const erMsg = err.errors[0]?.longMessage as string;
        Snackbar.show({ text: erMsg, duration: 3000 });
      } finally {
        setLoading(false);
      }
    } else {
      Snackbar.show({ text: 'Invalid Email Address', duration: 3000 });
      setLoading(false);
    }
  };

  return { isLoading: loading, submit };
};

export const onSignUp = ({ email, password }: Form) => {
  const [loading, setLoading] = React.useState(false);
  const { signUp, isLoaded, setActive } = useSignUp();

  const submit = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    if (isEmailValid(email)) {
      try {
        // Create the user on Clerk
        const result = await signUp.create({
          emailAddress: email,
          password,
        });
        // This indicates the user is signed in
        await setActive({ session: result.createdSessionId });
      } catch (err: any) {
        const erMsg = err.errors[0]?.longMessage as string;
        Snackbar.show({ text: erMsg, duration: 3000 });
      } finally {
        setLoading(false);
      }
    } else {
      Snackbar.show({ text: 'Invalid Email Address', duration: 3000 });
      setLoading(false);
    }
  };

  return { isLoading: loading, submit };
};

export const onSocialSignin = (social: UseOAuthFlowParams['strategy']) => {
  const [loading, setLoading] = React.useState(false);
  const { startOAuthFlow } = useOAuth({ strategy: social });

  const submit = async () => {
    try {
      const result = await startOAuthFlow();
      await result.setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      const erMsg = err.errors[0]?.longMessage as string;
      Snackbar.show({ text: erMsg, duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading: loading, submit };
};
