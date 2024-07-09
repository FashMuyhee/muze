import { View, KeyboardAvoidingView, Image, StyleSheet, LayoutChangeEvent } from 'react-native';
import React, { useState } from 'react';
import { ChatBubble, MessageField, SuggestedQuery } from '@components';
import { COLORS } from '@constants';
import { FlashList } from '@shopify/flash-list';
import { Content } from '@google/generative-ai';
import { useAskGemini } from '@hook';
import { IS_ANDROID } from '@constants/utilts';

type Props = {};

const NewChat = (props: Props) => {
  const flashListRef = React.useRef<FlashList<Content>>(null);
  const [height, setHeight] = useState(0);
  const { response, runGemini, onRegenerate } = useAskGemini();

  const onSubmitQuery = async (q: string) => {
    // SEND DATA TO OPEN AI
    await runGemini(q);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height * 0.25);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fcfcfc' }} onLayout={onLayout}>
      <FlashList
        ref={flashListRef}
        data={response}
        renderItem={({ item, index }) => <ChatBubble {...item} canRegenerate={index == response.length - 1} onRegenerate={onRegenerate} />}
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
        <MessageField onSend={onSubmitQuery} />
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
