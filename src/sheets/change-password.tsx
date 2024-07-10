import { TextInput } from 'react-native';
import React from 'react';
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { useUser } from '@clerk/clerk-expo';
import { Button, Text, TextField } from '@components';
import Snackbar from 'react-native-snackbar';

const ChangePasswordSheet = ({ sheetId }: SheetProps<'change-password'>) => {
  const { user } = useUser();
  const [body, setBody] = React.useState({ newPassword: '', currentPassword: '' });
  const ref = React.useRef<TextInput>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await user?.updatePassword({ ...body, signOutOfOtherSessions: true });
      Snackbar.show({
        text: 'Password updated successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
      setIsLoading(false);
      SheetManager.hide(sheetId);
    } catch (err) {
      //@ts-ignore
      const erMsg = err.errors[0]?.longMessage as string;
      Snackbar.show({
        text: erMsg ?? 'Failed to update password',
        duration: Snackbar.LENGTH_SHORT,
      });
      setIsLoading(false);
    }
  };

  return (
    <ActionSheet keyboardHandlerEnabled id={sheetId} animated snapPoints={[45]} containerStyle={{ flex: 1, padding: 20 }}>
      <Text fontSize={25} fontWeight="bold" style={{ marginBottom: 10 }}>
        Change Password
      </Text>
      <TextField
        placeholder="Current Password"
        isPassword
        value={body.currentPassword}
        onChangeText={(t) => setBody({ ...body, currentPassword: t })}
        onSubmit={() => ref.current?.focus()}
      />
      <TextField
        ref={ref}
        placeholder="New Password"
        isPassword
        value={body.newPassword}
        onChangeText={(t) => setBody({ ...body, newPassword: t })}
        onSubmit={onSubmit}
      />
      <Button text="Submit" onPress={onSubmit} isLoading={isLoading} />
    </ActionSheet>
  );
};

export default ChangePasswordSheet;
