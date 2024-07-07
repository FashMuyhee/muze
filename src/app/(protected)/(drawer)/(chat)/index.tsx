import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import MessageField from './components/MessageField';
import { SH } from '@constants/utilts';
import { COLORS } from '@constants';

type Props = {};

const NewChat = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {['1', 2, 4].map((_, k) => (
          <View key={k} style={{ height: SH * 0.35, marginBottom: 20, backgroundColor: COLORS.teal }} />
        ))}
      </ScrollView>
      <KeyboardAvoidingView keyboardVerticalOffset={70} behavior='position'>
        <MessageField onSend={console.log} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewChat;
