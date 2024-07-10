import { type SQLiteDatabase } from 'expo-sqlite/next';
import { Content } from '@google/generative-ai';
import { Role } from '@hook';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    const result = await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE chats (
        id INTEGER PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL
      );

      CREATE TABLE messages (
        id INTEGER PRIMARY KEY NOT NULL, 
        chat_id INTEGER NOT NULL, 
        role TEXT, 
        parts TEXT, 
        FOREIGN KEY (chat_id) REFERENCES chats (id) ON DELETE CASCADE
      );
    `);

    currentDbVersion = 1;
    console.log(result);
  }

  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export const addChat = async (db: SQLiteDatabase, title: string) => {
  return await db.runAsync('INSERT INTO chats (title) VALUES (?)', title);
};

export type Chat = {
  id: string;
  title: string;
};

export const getChats = async (db: SQLiteDatabase) => {
  return await db.getAllAsync<Chat>('SELECT * FROM chats');
};

type MessageRow = {
  role: string;
  parts: string;
  chat_id: number;
};


export const getMessages = async (db: SQLiteDatabase, chatId: number): Promise<Content[]> => {
  return (await db.getAllAsync<MessageRow>('SELECT * FROM messages WHERE chat_id = ?', chatId)).map((message) => ({
    role: message.role,
    parts: JSON.parse(message.parts) as Content['parts'],
  }));
};

export const addMessage = async (db: SQLiteDatabase, chatId: number, { role, parts }: Content) => {
  try {
    const r = await db.runAsync('INSERT INTO messages (chat_id, role, parts) VALUES (?, ?, ?)', chatId, role, JSON.stringify(parts));
    return r;
  } catch (error) {
    console.log(error);
  }
};

export const deleteChat = async (db: SQLiteDatabase, chatId: number) => {
  // return await db.runAsync('DELETE FROM chats WHERE id = ?', chatId);
  return await db.runAsync(`DELETE FROM chats WHERE id = ?; DELETE FROM messages WHERE chat_id = ?;`, chatId);
};

export const deleteMessages = async (db: SQLiteDatabase, chatId: number) => {
  return await db.runAsync('DELETE FROM messages WHERE id IN (SELECT id FROM messages WHERE chat_id = ? ORDER BY id DESC LIMIT 2)', chatId);
};

export const renameChat = async (db: SQLiteDatabase, chatId: number, title: string) => {
  return await db.runAsync('UPDATE chats SET title = ? WHERE id = ?', title, chatId);
};
