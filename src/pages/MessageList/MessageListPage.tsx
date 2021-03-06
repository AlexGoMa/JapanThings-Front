import MessageList from "../../components/MessageList/MessageList";
import NavBar from "../../components/NavBar/NavBar";
import SubNavBar from "../../components/subNavbar/SubNavBar";
import MessageListPageStyled from "./MessageListPageStyled";

const MessageListPage = () => {
  return (
    <>
      <NavBar />
      <SubNavBar />
      <MessageListPageStyled>
        <MessageList />
      </MessageListPageStyled>
    </>
  );
};

export default MessageListPage;
