import { View, Text, KeyboardAvoidingView, Image, StyleSheet, LayoutChangeEvent } from 'react-native';
import React, { useState } from 'react';
import { ChatBubble, MessageField, SuggestedQuery } from './components';
import { SH } from '@constants/utilts';
import { COLORS } from '@constants';
import { FlashList } from '@shopify/flash-list';
import OpenAI from 'react-native-openai';

const OPENAI_KEY = process.env.EXPO_PUBLIC_OPENAI_KEY;

type Props = {};
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

const messages: Message[] = [
  {
    role: Role.User,
    content: 'Hello, can you help me with my homework?',
  },
  {
    role: Role.Bot,
    content: 'Of course! What subject are you working on?',
  },
  {
    role: Role.User,
    content: "I'm struggling with my math assignment.",
  },
  {
    role: Role.Bot,
    content: 'Math can be challenging. Which part of your assignment do you need help with?',
  },
  {
    role: Role.User,
    content: "I don't understand how to solve quadratic equations.",
  },
  {
    role: Role.Bot,
    content: 'No problem! A quadratic equation is usually in the form ax^2 + bx + c = 0. Would you like to go through an example together?',
    imageUrl: 'https://example.com/quadratic-equation-example.png',
  },
  {
    role: Role.User,
    content: 'Yes, that would be great!',
  },
  {
    role: Role.Bot,
    content: "Alright, let's start with a simple one: x^2 - 4x + 4 = 0. Can you try solving it?",
    prompt: 'Explain the steps to solve a quadratic equation.',
  },
  {
    role: Role.User,
    content: 'I think the solution is x = 2.',
  },
  {
    role: Role.Bot,
    content: "That's correct! Great job. If you have any other questions, feel free to ask.",
  },
  {
    role: Role.User,
    content: 'Thanks! I also need help with history.',
  },
  {
    role: Role.Bot,
    content: 'Sure, what specific topic in history are you working on?',
  },
  {
    role: Role.User,
    content: 'I need to write an essay about the Industrial Revolution.',
  },
  {
    role: Role.Bot,
    content:
      'The Industrial Revolution was a period of major industrialization and innovation that took place during the late 1700s and early 1800s. Would you like some key points to include in your essay?',
    prompt: 'Provide key points about the Industrial Revolution.',
  },
  {
    role: Role.User,
    content: 'Yes, please.',
  },
  {
    role: Role.Bot,
    content:
      'Here are some key points: 1. Introduction of machinery 2. Rise of factories 3. Growth of cities 4. Improvement in transportation 5. Changes in labor and society. Would you like more details on any of these points?',
  },
  {
    role: Role.User,
    content: 'Can you explain the changes in labor and society?',
  },
  {
    role: Role.Bot,
    content:
      'Certainly! The Industrial Revolution led to significant changes in labor, including the shift from agricultural work to factory jobs. This resulted in urbanization as people moved to cities for work. Working conditions in factories were often harsh, leading to the development of labor unions and eventual reforms.',
  },
];

const NewChat = (props: Props) => {
  const [height, setHeight] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const openAI = React.useMemo(
    () =>
      new OpenAI({
        apiKey: OPENAI_KEY ?? '',
        organization: 'org-3UbykIus0F0cqUWpipRACCbi',
      }),
    [],
  );

  const onSubmitQuery = (q: string) => {
    setMessages([...messages, { role: Role.User, content: q }, { role: Role.Bot, content: '' }]);

    // SEND DATA TO OPEN AI
    openAI.chat.stream({
      messages: [
        {
          role: 'user',
          content: q,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
  };

  const onChatMessageReceived = (p: any) => {
    console.log(p);
    setMessages((messages) => {
      const newMessage = p.choices[0]?.delta.content;
      if (newMessage) {
        messages[messages.length - 1].content += newMessage;
        return [...messages];
      }
      return messages;
    });
  };

  React.useEffect(() => {
    openAI.chat.addListener('onChatMessageReceived', onChatMessageReceived);

    return () => {
      openAI.chat.removeListener('onChatMessageReceived');
    };
  }, [openAI]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height * 0.25);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.light }} onLayout={onLayout}>
      <FlashList
        data={messages}
        renderItem={({ item }) => <ChatBubble {...item} />}
        estimatedItemSize={400}
        extraData={messages}
        contentContainerStyle={{ paddingTop: 30, paddingBottom: 150, paddingHorizontal: 10 }}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <View style={[styles.logoContainer, { marginTop: height }]}>
            <Image source={require('@assets/images/logo.png')} style={styles.image} />
          </View>
        }
      />
      {/* )} */}
      <KeyboardAvoidingView keyboardVerticalOffset={70} behavior="position" style={{ position: 'absolute', width: '100%', bottom: 0 }}>
        {messages.length == 0 && <SuggestedQuery onSuggestionPress={onSubmitQuery} />}
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
