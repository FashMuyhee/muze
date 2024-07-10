import { TextInput, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { COLORS } from '@utils';
import { TextFieldProps } from './types';
import { StackView } from './Flex';
import { Ionicons } from '@expo/vector-icons';

export const TextField = React.forwardRef<TextInput, TextFieldProps>(({ isPassword, ...props }: TextFieldProps, ref) => {
  const [isConfiscate, setIsConfiscate] = React.useState(isPassword);
  const [isFocus, setIsFocus] = React.useState(false);

  const borderColor = React.useMemo(() => {
    if (isFocus) return COLORS.primary;
    return COLORS.greyLight;
  }, [isFocus]);
  return (
    <StackView align="center" style={[styles.container, { borderColor }]}>
      <TextInput
        ref={ref}
        selectionColor={COLORS.primary}
        autoCapitalize="none"
        style={styles.inputField}
        placeholderTextColor={COLORS.grey}
        secureTextEntry={isConfiscate}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        keyboardType={isPassword ? 'default' : 'email-address'}
        onSubmitEditing={props.onSubmit}
        returnKeyType={props.isSubmittingField ? 'done' : 'next'}
        {...props}
      />
      {isPassword && (
        <Pressable onPress={() => setIsConfiscate(!isConfiscate)} style={styles.eyeIcon}>
          <Ionicons name={isConfiscate ? 'eye' : 'eye-off'} size={15} color={COLORS.greyLight} />
        </Pressable>
      )}
    </StackView>
  );
});


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 7,
    backgroundColor: '#fff',
    height: 50,
    columnGap: 10,
  },
  inputField: {
    height: '100%',
    padding: 10,
    color: COLORS.black,
    flex: 1,
  },
  eyeIcon: {
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
