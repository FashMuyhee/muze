import { TextInput } from 'react-native';
import React from 'react';
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { useUser } from '@clerk/clerk-expo';
import { Button, Text, TextField } from '@components';
import { onUpdateProfile } from '@hook';

const UpdateProfileSheet = ({ sheetId }: SheetProps<'change-password'>) => {
  const { user } = useUser();
  const [body, setBody] = React.useState({ firstName: '', lastName: '', username: '' });
  const lastInputRef = React.useRef<TextInput>(null);
  const firstInputRef = React.useRef<TextInput>(null);
  const { lastName, firstName, username } = user || {};

  const { isLoading, submit } = onUpdateProfile();

  const onSubmit = async () => {
    await submit(body);
    SheetManager.hide(sheetId);
  };

  React.useEffect(() => {
    setBody({
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      username: username ?? '',
    });
  }, [user]);

  return (
    <ActionSheet keyboardHandlerEnabled id={sheetId} animated snapPoints={[45]} containerStyle={{ flex: 1, padding: 20 }}>
      <Text fontSize={25} fontWeight="bold" style={{ marginBottom: 10 }}>
        Update Profile
      </Text>
      <TextField
        placeholder="Username"
        value={body.username}
        onChangeText={(t) => setBody({ ...body, username: t })}
        onSubmit={() => firstInputRef.current?.focus()}
      />
      <TextField
        placeholder="First Name"
        ref={firstInputRef}
        value={body.firstName}
        onChangeText={(t) => setBody({ ...body, firstName: t })}
        onSubmit={() => lastInputRef.current?.focus()}
      />
      <TextField
        placeholder="Last Name"
        ref={lastInputRef}
        value={body.lastName}
        onChangeText={(t) => setBody({ ...body, lastName: t })}
        onSubmit={onSubmit}
        isSubmittingField
      />

      <Button text="Save" onPress={onSubmit} isLoading={isLoading} />
    </ActionSheet>
  );
};

export default UpdateProfileSheet;
