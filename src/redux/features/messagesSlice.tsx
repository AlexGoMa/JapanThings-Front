import { createSlice } from "@reduxjs/toolkit";

export interface State {
  id: string;
  image: string;
  imageBackup: string;
  text: string;
  category: string;
  author: string;
}

const initialState: State[] = [];

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    loadMessages: (messages, action) => [...action.payload],
    deleteMessage: (messages, action) =>
      messages.filter((message) => message.id !== action.payload),
    createMessage: (messages, action) => [...messages, action.payload],
    updateMessage: (messages, action) =>
      messages.map((message) =>
        message.id === action.payload.id
          ? { ...action.payload }
          : { ...message }
      ),
    noMessages: () => [],
  },
});

export const {
  loadMessages: loadMessagesActionCreator,
  deleteMessage: deleteMessageActionCreator,
  createMessage: createMessageActionCreator,
  updateMessage: updateMessageActionCreator,
  noMessages: noMessagesActionCreator,
} = messageSlice.actions;

export default messageSlice.reducer;
