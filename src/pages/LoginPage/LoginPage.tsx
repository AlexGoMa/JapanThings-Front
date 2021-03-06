import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = (): JSX.Element => {
  return (
    <LoginPageStyled>
      <div className="maincontainer">
        <Header />
        <LoginForm />
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
