import React from 'react';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey ?? '');
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export enum Role {
  User = 'user',
  Bot = 'model',
}

/* Hook for using AskGemini
 */
export const useAskGemini = () => {
  const [messages, setMessages] = React.useState<Content[]>([]);
  const [prompt, setPrompt] = React.useState('');

  function removeLastTwoElements(q: string): Content[] {
    const newMessageResponse = messages;
    if (newMessageResponse.length < 2) {
      return [];
    }
    // Use splice to remove the last two elements
    newMessageResponse.splice(-2, 2);
    return newMessageResponse;
  }

  const runGemini = async (q: string, removeLast2: boolean = false) => {
    // preset USER QUERY ON LIST
    const history = removeLast2 ? removeLastTwoElements(q) : messages;
    setMessages([...history, { role: Role.User, parts: [{ text: q }] }, { role: Role.Bot, parts: [{ text: '' }] }]);
    setPrompt(q);
    const chatSession = model.startChat({
      generationConfig,
      history: [...history],
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

  const onRegenerate = async (q?: string) => {
    const query = q ? q : prompt;
    await runGemini(query, true);
  };

  return { runGemini, response: messages, onRegenerate };
};
