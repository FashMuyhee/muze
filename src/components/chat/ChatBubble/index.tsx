import { COLORS } from '@constants';
import { Content } from '@google/generative-ai';
import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import TypingBubble from './TypingIndicator';
import FormattedText from './FormattedText';
import { DropdownMenu, HorizontalPlacement, VerticalPlacement } from '@components/Popover';
import { Role, useTextToSpeech } from '@hook';
import * as Clipboard from 'expo-clipboard';
import Snackbar from 'react-native-snackbar';
import { modelMenu, canRegenerateMenu, userMenu } from './dropmenus';
import { Ionicons } from '@expo/vector-icons';
import { IconButton } from '@components/commons';

interface ChatBubbleProps extends Content {
  canRegenerate: boolean;
  onRegenerate: () => void;
  onEdit: (q: string) => void;
  userCanEdit: boolean;
}

const ChatBubbleBase = ({ parts, role, onRegenerate, canRegenerate, onEdit, userCanEdit }: ChatBubbleProps) => {
  const { text: content } = parts[0];
  const isUser = role === Role.User;
  const loading = content == '';

  const { speak, isPaused } = useTextToSpeech();

  const onCopyToClipboard = async () => {
    await Clipboard.setStringAsync(content ?? '');
    Snackbar.show({ text: 'Copied' });
  };

  const _renderDropdown = () => {
    if (isUser) {
      if (userCanEdit) {
        return userMenu(() => onEdit(content as string));
      }
    }
    if (canRegenerate) {
      return canRegenerateMenu(onCopyToClipboard, onRegenerate);
    }
    return modelMenu(onCopyToClipboard);
  };

  const _renderUser = () => {
    return role === Role.Bot ? (
      <Image source={require('@assets/images/logo.png')} style={styles.avatar} />
    ) : (
      <Image source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }} style={styles.avatar} />
    );
  };

  const _renderContent = () => {
    return <FormattedText text={content as string} />;
  };

  return (
    <DropdownMenu
      triggerBy="longPress"
      placement={[VerticalPlacement.BELOW, isUser ? HorizontalPlacement.LEFT : HorizontalPlacement.RIGHT]}
      trigger={
        <View
          style={[
            styles.row,
            {
              alignSelf: isUser ? 'flex-end' : 'flex-start',
              flexDirection: isUser ? 'row-reverse' : 'row',
              width: isUser ? '70%' : '100%',
            },
          ]}>
          {_renderUser()}
          <View
            style={[
              styles.content,
              {
                borderBottomLeftRadius: isUser ? 15 : 0,
                borderBottomRightRadius: isUser ? 0 : 15,
                backgroundColor: isUser ? `${COLORS.primary}` : COLORS.input,
              },
            ]}>
            {loading ? <TypingBubble /> : _renderContent()}
          </View>
          {!isUser && !loading && (
            <IconButton
              onPress={() => speak(content ?? '')}
              icon={<Ionicons name={isPaused ? 'play' : 'pause'} color={COLORS.light} />}
              bg={COLORS.black}
              rounded
              size={30}
            />
          )}
        </View>
      }
      menuItems={_renderDropdown()}
    />
  );
};
export const ChatBubble = ChatBubbleBase;

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    columnGap: 5,
    marginVertical: 10,
    flexDirection: 'row',
  },
  content: {
    borderRadius: 15,
    padding: 10,
    maxWidth: '80%',
    minWidth: '20%',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.light,
  },
  text: {
    fontSize: 13,
    flexWrap: 'wrap',
    flex: 1,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
  loading: {
    justifyContent: 'center',
    height: 26,
    marginLeft: 14,
  },
});
