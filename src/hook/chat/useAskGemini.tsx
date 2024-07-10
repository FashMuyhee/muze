import React, { useRef } from 'react';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { useSQLiteContext } from 'expo-sqlite';
import { addChat, addMessage, deleteMessages, getMessages } from '@utils/Database';

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
export const useAskGemini = (chatId: number) => {
  const [messages, setMessages] = React.useState<Content[]>([]);
  const [prompt, setPrompt] = React.useState('');
  const chatIdRef = useRef('');

  const db = useSQLiteContext();

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
    if (messages.length == 0) {
      const _result = await addChat(db, q);
      const chatId = _result.lastInsertRowId.toString();
      chatIdRef.current = chatId;
    }
    await addMessage(db, parseInt(chatIdRef.current), { parts: [{ text: q }], role: Role.User });
    // PRESET USER QUERY ON LIST
    const history = removeLast2 ? removeLastTwoElements(q) : messages;
    setMessages([...history, { role: Role.User, parts: [{ text: q }] }, { role: Role.Bot, parts: [{ text: '' }] }]);
    setPrompt(q);
    // CALL GEMINI
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
      await addMessage(db, parseInt(chatIdRef.current), { parts: [{ text }], role: Role.Bot });
    }
  };

  const onRegenerate = (q?: string) => {
    deleteMessages(db, parseInt(chatIdRef.current)).then(async () => {
      const query = q ? q : prompt;
      await runGemini(query, true);
    });
  };

  React.useEffect(() => {
    if (chatId > 0) {
      getMessages(db, chatId).then((me) => {
        setMessages(me);
        chatIdRef.current = chatId.toString();
      });
    }
  }, [chatId]);

  return { runGemini, response: messages, onRegenerate };
};
