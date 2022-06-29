import axios from "axios";
import { toast } from "react-toastify";
import {
  startLoadingModal,
  stopErrorLoadingModal,
  stopOkLoadingModal,
} from "../../components/LoadingModal/LoadingModal";
import {
  createMessageActionCreator,
  deleteMessageActionCreator,
  loadMessagesActionCreator,
  updateMessageActionCreator,
} from "../features/messagesSlice";
import { loadOneMessageActionCreator } from "../features/oneMessageSlice";
import { AppDispatch } from "../store/store";

interface Message {
  image: any;
  imageBackup: any;
  text: string;
  category: string;
  author: string;
  id: string;
}

interface AxiosMessageResponse {
  messages: Message[];
}

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const messagesListThunk = () => async (dispatch: AppDispatch) => {
  try {
    startLoadingModal("Loading messages...");
    const urlPath = `${process.env.REACT_APP_API_URL}messages/list`;
    const {
      data: { messages },
    } = await axios.get<AxiosMessageResponse>(urlPath, getAuthHeader());
    dispatch(loadMessagesActionCreator(messages));
    stopOkLoadingModal("Messages loaded");
  } catch (error: any) {
    stopErrorLoadingModal(
      `Something gone wrong: ${error.response.data.message}`
    );
  }
};

export const mineMessagesListThunk =
  (username: string) => async (dispatch: AppDispatch) => {
    try {
      startLoadingModal("Loading messages...");
      const urlPath = `${process.env.REACT_APP_API_URL}messages/mine`;
      const {
        data: { messages },
      } = await axios.get<AxiosMessageResponse>(urlPath, getAuthHeader());
      dispatch(loadMessagesActionCreator(messages));
      stopOkLoadingModal(`Messages Loaded`);
    } catch (error: any) {
      stopErrorLoadingModal(
        `Something gone wrong: ${error.response.data.message}`
      );
    }
  };

export const getMessagesByCategoryThunk =
  (category: string) => async (dispatch: AppDispatch) => {
    try {
      startLoadingModal("Loading messages...");
      const urlPath = `${process.env.REACT_APP_API_URL}messages/category/${category}`;
      const {
        data: { messages },
      } = await axios.get<AxiosMessageResponse>(urlPath, getAuthHeader());
      dispatch(loadMessagesActionCreator(messages));
      stopOkLoadingModal(`Messages Loaded`);
    } catch (error: any) {
      stopErrorLoadingModal(
        `Something gone wrong: ${error.response.data.message}`
      );
    }
  };

export const messageDeleteThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      startLoadingModal("Erasing message....");
      const urlPath = `${process.env.REACT_APP_API_URL}messages/${id}`;
      await axios.delete(urlPath, getAuthHeader());
      dispatch(deleteMessageActionCreator(id));
      stopOkLoadingModal(`Message deleted successfully`);
    } catch (error: any) {
      stopErrorLoadingModal(
        `Something gone wrong: ${error.response.data.message}`
      );
    }
  };

export const messageGetThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      startLoadingModal("Getting message....");
      const urlPath = `${process.env.REACT_APP_API_URL}messages/one/${id}`;
      const {
        data: { message },
      } = await axios.get(urlPath, getAuthHeader());
      dispatch(loadOneMessageActionCreator(message));
      stopOkLoadingModal(`Message got successfully`);
    } catch (error: any) {
      stopErrorLoadingModal(
        `Something gone wrong: ${error.response.data.message}`
      );
    }
  };

export const messageCreateThunk =
  (formData: {
    username: string;
    category: string;
    text: string;
    image: string;
    imageBackup: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const urlPath = `${process.env.REACT_APP_API_URL}messages/mine/create`;
      await axios.post(urlPath, formData, getAuthHeader());
      dispatch(createMessageActionCreator);
      dispatch(messagesListThunk);
      toast.success("Message Published correctly!");
    } catch (error: any) {
      toast.error(`Something gone wrong: ${error.response.data.message}`);
    }
  };

export const messageUpdateThunk =
  (formData: {
    id: string;
    username: string;
    category: string;
    text: string;
    image: string;
    imageBackup: string;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const urlPath = `${process.env.REACT_APP_API_URL}messages/update/${formData.id}`;
      await axios.put(urlPath, formData, getAuthHeader());
      dispatch(updateMessageActionCreator(formData.id));
      dispatch(mineMessagesListThunk(formData.username));
      toast.success("Message updated correctly!");
    } catch (error: any) {
      toast.error(`Something gone wrong: ${error.response.data.message}`);
    }
  };
