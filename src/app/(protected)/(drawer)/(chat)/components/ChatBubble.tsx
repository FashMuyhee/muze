// import { copyImageToClipboard, downloadAndSaveImage, shareImage } from '@/utils/Image';
import { COLORS } from '@constants';
import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

export enum Role {
  User = 'user',
  Bot = 'bot',
}

export interface Message {
  role: Role;
  content: string;
  imageUrl?: string;
  prompt?: string;
}

export interface Chat {
  id: number;
  title: string;
}

interface ChatBubbleProps extends Message {
  loading?: boolean;
}

const ChatBubbleBase = ({ content, role, imageUrl, prompt, loading }: ChatBubbleProps) => {
  // const contextItems = [
  //   { title: 'Copy', systemIcon: 'doc.on.doc', action: () => copyImageToClipboard(imageUrl!) },
  //   {
  //     title: 'Save to Photos',
  //     systemIcon: 'arrow.down.to.line',
  //     action: () => downloadAndSaveImage(imageUrl!),
  //   },
  //   { title: 'Share', systemIcon: 'square.and.arrow.up', action: () => shareImage(imageUrl!) },
  // ];

  const isUser = role === Role.User;

  const _renderUser = () => {
    return role === Role.Bot ? (
      <Image source={require('@assets/images/logo.png')} style={styles.avatar} />
    ) : (
      <Image source={{ uri: 'https://galaxies.dev/img/meerkat_2.jpg' }} style={styles.avatar} />
    );
  };

  const _renderContent = () => {
    return (
      <Text selectable aria-selected selectionColor={COLORS.primary} style={styles.text}>
        {content}
      </Text>
    );
  };

  return (
    <View
      style={[
        styles.row,
        {
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          flexDirection: isUser ? 'row-reverse' : 'row',
          width: isUser ? '70%' : '100%',
          minWidth: '20%',
        },
      ]}>
      {_renderUser()}
      <View
        style={[
          styles.content,
          {
            borderBottomLeftRadius: isUser ? 15 : 0,
            borderBottomRightRadius: isUser ? 0 : 15,
            backgroundColor: isUser ? `${COLORS.primary}1a` : COLORS.input,
          },
        ]}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={COLORS.primary} size="small" />
          </View>
        ) : (
          _renderContent()
        )}
      </View>
    </View>
  );
};
export const ChatBubble = React.memo(ChatBubbleBase);

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 10,
    flexDirection: 'row',
  },
  content: {
    borderRadius: 15,
    flex: 1,
    padding: 10,
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
