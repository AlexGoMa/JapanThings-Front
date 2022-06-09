import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutActionCreator } from "../../redux/features/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import NavBarStyled from "./NavBarStyled";

const NavBar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const Logout = (): void => {
    localStorage.removeItem("token");
    dispatch(logoutActionCreator());
    toast.success("Logout successfull!");
  };

  const goToHome = (): void => {
    navigate("/messageslist");
  };

  const goToMyMessages = (): void => {
    navigate("/myMessageList");
  };

  const goToCreateMessage = (): void => {
    navigate("/messageCreate");
  };

  return (
    <NavBarStyled>
      <Button
        className="homeButton"
        variant="contained"
        type="submit"
        onClick={goToHome}
      >
        Home
      </Button>

      <Button
        className="myMessages"
        variant="contained"
        type="submit"
        onClick={goToMyMessages}
      >
        My messages
      </Button>

      <Button
        className="createButton"
        variant="contained"
        type="submit"
        onClick={goToCreateMessage}
      >
        Create message
      </Button>
      <Button
        className="logoutButton"
        variant="contained"
        type="submit"
        onClick={Logout}
      >
        Logout
      </Button>
    </NavBarStyled>
  );
};

export default NavBar;
