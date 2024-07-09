import React from 'react';
import * as Speech from 'expo-speech';
import { parseContentToString } from '@components/chat/ChatBubble/FormattedText';

type Props = {};

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);

  const speak = (text: string) => {
    console.log(parseContentToString(text).join(' '));
    if (!isSpeaking && isPaused) {
      Speech.speak(parseContentToString(text).join(' '), {
        language: 'en',
        onDone: () => {
          setIsPaused(true);
          setIsSpeaking(false);
        },
        onError: () => {
          setIsPaused(true);
        },
      });
      setIsPaused(false);
      setIsSpeaking(true);
      return;
    }

    // if (isSpeaking && isPaused) {
    //   Speech.resume();
    // }

    // if (isSpeaking && !isPaused) {
    //   Speech.pause();
    // }

    Speech.stop().then(() => {
      setIsPaused(true);
      setIsSpeaking(false);
    });
  };

  return { speak, isSpeaking, isPaused: isPaused };
};
