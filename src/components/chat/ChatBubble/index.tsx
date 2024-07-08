// import { copyImageToClipboard, downloadAndSaveImage, shareImage } from '@/utils/Image';
import { COLORS } from '@constants';
import { Content } from '@google/generative-ai';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TypingBubble from './TypingIndicator';
import FormattedText from './FormattedText';
import { DropdownMenu } from '@components/Popover';
import { Ionicons } from '@expo/vector-icons';
import { Role } from '@hook';



interface ChatBubbleProps extends Content {
  // loading?: boolean;
}

const ChatBubbleBase = ({ parts, role }: ChatBubbleProps) => {
  const { text: content } = parts[0];
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
  const loading = content == '';

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
        </View>
      }
      menuItems={[
        {
          label: 'Copy',
          icon: <Ionicons name="copy" />,
          onPress: () => {},
        },

        {
          label: 'Share',
          icon: <Ionicons name="share-social" />,
          onPress: () => {},
        },
      ]}
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
