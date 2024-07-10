import React from 'react';
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { Button, Text, TextField } from '@components';
import { onDeleteAccount } from '@hook';
import Snackbar from 'react-native-snackbar';

const DeleteAccountSheet = ({ sheetId }: SheetProps<'delete-account'>) => {
  const [body, setBody] = React.useState('');

  const { submit, isLoading } = onDeleteAccount();

  const onSubmit = async () => {
    if (!body) {
      Snackbar.show({
        text: 'Email is required',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    SheetManager.hide(sheetId);
    await submit(body);
  };

  return (
    <ActionSheet id={sheetId} animated snapPoints={[45]} containerStyle={{ flex: 1, padding: 20 }}>
      <Text fontSize={25} fontWeight="bold" style={{ marginBottom: 10 }}>
        Delete Account
      </Text>
      <Text>Deleting your account is PERMANENT, your access to your Muze will be revoked. Are you sure you want to proceed?</Text>
      <Text style={{ marginVertical: 10 }}>
        Enter you email address if you feel this is the right thing to do, but don't worry I will always welcome you 🥺 whenever you're ready.
      </Text>

      <TextField placeholder="Email" value={body} onChangeText={setBody} onSubmit={onSubmit} />
      <Button style={{ marginTop: 20 }} bgColor="#ff2222" text="Proceed" onPress={onSubmit} isLoading={isLoading} />
    </ActionSheet>
  );
};

export default DeleteAccountSheet;
