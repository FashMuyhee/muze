import { View, KeyboardAvoidingView, Image, StyleSheet, LayoutChangeEvent } from 'react-native';
import React, { useState } from 'react';
import { ChatBubble, MessageField, MessageFieldRef, SuggestedQuery } from '@components';
import { COLORS } from '@utils';
import { FlashList } from '@shopify/flash-list';
import { Content } from '@google/generative-ai';
import { useAskGemini } from '@hook';
import { IS_ANDROID } from '@utils/helpers';
import { useLocalSearchParams } from 'expo-router';

const NewChat = () => {
  const flashListRef = React.useRef<FlashList<Content>>(null);
  const messageField = React.useRef<MessageFieldRef>(null);
  const listHeight = React.useRef(0);
  const { id } = useLocalSearchParams<{ id: string }>();

  const [height, setHeight] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { response, runGemini, onRegenerate } = useAskGemini(parseInt(id as string));

  const onSubmitQuery = async (q: string) => {
    onScroll(50);
    if (isEditing) {
      onRegenerate(q);
      setIsEditing(false);
      onScroll(50);
      return;
    }
    // SEND DATA TO OPEN AI
    await runGemini(q);
    onScroll(1000);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height * 0.25);
  };

  const onEdit = (text: string) => {
    messageField.current?.onChange(text);
    setIsEditing(true);
  };

  const onScroll = (extra: number = 0) => {
    if (flashListRef.current) {
      flashListRef.current?.scrollToIndex({
        animated: true,
        index: response.length + 1,
        viewOffset: extra,
        viewPosition: 0,
      });
    }
  };

  React.useEffect(() => {
    onScroll(100);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fcfcfc' }} onLayout={onLayout}>
      <FlashList
        ref={flashListRef}
        data={response}
        renderItem={({ item, index }) => (
          <ChatBubble
            userCanEdit={index == response.length - 2}
            onEdit={onEdit}
            {...item}
            canRegenerate={index == response.length - 1}
            onRegenerate={onRegenerate}
          />
        )}
        onLayout={({ nativeEvent }) => {
          listHeight.current = nativeEvent.layout.height;
        }}
        estimatedItemSize={400}
        extraData={response}
        contentContainerStyle={{ paddingTop: 30, paddingBottom: 150, paddingHorizontal: 10 }}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <View style={[styles.logoContainer, { marginTop: height }]}>
            <Image source={require('@assets/images/logo.png')} style={styles.image} />
          </View>
        }
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        behavior={IS_ANDROID ? 'height' : 'position'}
        style={{ position: 'absolute', width: '100%', bottom: 0 }}>
        {response.length == 0 && <SuggestedQuery onSuggestionPress={onSubmitQuery} />}
        <MessageField onSend={onSubmitQuery} ref={messageField} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewChat;

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 50,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
  },
});
