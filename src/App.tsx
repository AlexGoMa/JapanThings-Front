import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MessageListPage from "./pages/MessageList/MessageListPage";
import LoggedCheck from "./redux/utils/LoggedCheck/LoggedCheck";
import NotLoggedCheck from "./redux/utils/NotLoggedCheck/NotLoggedCheck";
import MessageCreatePage from "./pages/MessageCreatePage/MessageCreatePage";
import MineMessageListPage from "./pages/MineMessageList/MineMessageListPage";
import MessageEditPage from "./pages/MessageEditPage/MessageEditPage";
import MessageDetailPage from "./pages/MessageDetailPage/MessageDetailPage";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import {
  loginActionCreator,
  logoutActionCreator,
} from "./redux/features/userSlice";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { State } from "./redux/features/userSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userInfo: State = jwtDecode(token);
      dispatch(loginActionCreator(userInfo));
    } else {
      dispatch(logoutActionCreator());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LoggedCheck>
              <Navigate to="/messages-list" />
            </LoggedCheck>
          }
        />
        <Route
          path="/register"
          element={
            <NotLoggedCheck>
              <RegisterPage />
            </NotLoggedCheck>
          }
        />
        <Route
          path="/login"
          element={
            <NotLoggedCheck>
              <LoginPage />
            </NotLoggedCheck>
          }
        />
        <Route
          path="/messages-list"
          element={
            <LoggedCheck>
              <MessageListPage />
            </LoggedCheck>
          }
        />
        <Route
          path="/my-message-list"
          element={
            <LoggedCheck>
              <MineMessageListPage />
            </LoggedCheck>
          }
        />

        <Route
          path="/message-create"
          element={
            <LoggedCheck>
              <MessageCreatePage />
            </LoggedCheck>
          }
        />
        <Route
          path="/message-edit/:id"
          element={
            <LoggedCheck>
              <MessageEditPage />
            </LoggedCheck>
          }
        />

        <Route
          path="/message-detail/:id"
          element={
            <LoggedCheck>
              <MessageDetailPage />
            </LoggedCheck>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
