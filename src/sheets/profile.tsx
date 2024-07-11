import { View, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { CenterView, IconButton, StackView, Text } from '@components';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@utils';
import { useImagePicker } from '@hook';
import Snackbar from 'react-native-snackbar';

type AccessibilityLinkProps = {
  onPress: () => void;
  link: string;
  icon: React.ReactNode;
  bg: string;
};

const AccessibilityLink = ({ icon, link, onPress, bg }: AccessibilityLinkProps) => (
  <Pressable
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginTop: 10,
      columnGap: 10,
      backgroundColor: '#f4f4f4',
      padding: 10,
      borderRadius: 10,
    }}>
    <CenterView style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: `${bg}1a` }}>{icon}</CenterView>
    <Text fontWeight="600">{link}</Text>
  </Pressable>
);

const ProfileSheet = ({ sheetId }: SheetProps<'profile'>) => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const { emailAddresses, firstName, lastName, imageUrl, passwordEnabled, createdAt, username } = user || {};

  const { image, pickImage } = useImagePicker();

  const onSignOut = () => {
    SheetManager.hide(sheetId);
    signOut();
  };

  const onChangeProfile = async () => {
    const imageFIle = await pickImage();
    try {
      Snackbar.show({
        text: 'Uploading Image, please wait...',
        duration: Snackbar.LENGTH_INDEFINITE,
      });
      await user?.setProfileImage({ file: `data:${imageFIle?.mimeType};base64,${imageFIle?.base64}` });
      Snackbar.dismiss();
      Snackbar.show({
        text: 'Image uploaded successfully',
      });
    } catch (error) {
      Snackbar.show({
        text: 'Failed to upload image',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  return (
    <ActionSheet id={sheetId} animated snapPoints={[45]} containerStyle={{ flex: 1, paddingVertical: 20 }}>
      <StackView align="center" style={{ columnGap: 10, paddingHorizontal: 20 }}>
        <Pressable onPress={onChangeProfile} style={{ height: 70, width: 70 }}>
          <Image source={{ uri: !!image ? image.uri : imageUrl }} style={{ width: 60, height: 60, borderRadius: 10 }} />
          <IconButton
            size={25}
            icon={<Feather name="edit-2" size={10} color={COLORS.light} />}
            style={{ position: 'absolute', right: 10, bottom: 10, backgroundColor: COLORS.primary }}
          />
        </Pressable>
        <View style={{ flex: 1, rowGap: 5 }}>
          <Text numberLines={1} fontSize={14} color={COLORS.black}>{`${firstName} ${lastName}`}</Text>
          <Text numberLines={1} fontSize={13} color={COLORS.greyLight}>
            {emailAddresses?.at(0)?.emailAddress}
          </Text>
          <StackView align="center" style={{ columnGap: 10 }}>
            <Text numberLines={1} fontSize={13} color={COLORS.greyLight}>
              @{username}
            </Text>
            <Text numberLines={1} fontSize={12} color={COLORS.grey}>
              Joined at {createdAt?.toDateString()}
            </Text>
          </StackView>
        </View>
        <IconButton onPress={onSignOut} icon={<Feather name="log-out" size={24} color={COLORS.dark} />} />
      </StackView>
      <View style={{ height: StyleSheet.hairlineWidth, width: '100%', backgroundColor: COLORS.greyLight, marginTop: 20 }} />
      <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
        <AccessibilityLink
          onPress={() => SheetManager.show('update-profile')}
          link="Update Profile"
          bg={COLORS.primary}
          icon={<Ionicons name="person-add" size={15} color={COLORS.primary} />}
        />
        {passwordEnabled && (
          <>
            <AccessibilityLink
              onPress={() => SheetManager.show('change-password')}
              link="Change Password"
              bg={COLORS.primary}
              icon={<Ionicons name="key" size={15} color={COLORS.primary} />}
            />
          </>
        )}
        <AccessibilityLink
          onPress={() => SheetManager.show('delete-account')}
          link="Delete Account"
          bg="#ff2222"
          icon={<Ionicons name="remove-circle" size={18} color={'#ff2222'} />}
        />
      </View>
    </ActionSheet>
  );
};

export default ProfileSheet;
