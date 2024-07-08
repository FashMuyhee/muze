import React from 'react';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { Role } from '../components';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? '');
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export const useAskGemini = () => {
  const [messages, setMessages] = React.useState<Content[]>([]);

  const runGemini = async (q: string) => {
    // preset USER QUERY ON LIST
    setMessages([...messages, { role: Role.User, parts: [{ text: q }] }, { role: Role.Bot, parts: [{ text: '' }] }]);

    const chatSession = model.startChat({
      generationConfig,
      history: [...messages],
    });

    const result = await chatSession.sendMessage(q);
    const text = result.response.text();
    // SAVE RESPONSE
    if (text) {
      setMessages((messages) => {
        messages[messages.length - 1].parts[0].text += text;
        return [...messages];
      });
    }
  };

  return { runGemini, response: messages };
};
