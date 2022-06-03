import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { userLoginThunk } from "../../redux/thunks/userThunks";
import LoginFormStyled from "./LoginFormStyled";

const LoginForm = (): JSX.Element => {
  const blankFields = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(blankFields);

  const changeData = (event: { target: { id: string; value: string } }) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const dispatch = useAppDispatch();

  const submitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(userLoginThunk(formData));
    setFormData(blankFields);
  };

  return (
    <LoginFormStyled>
      <form onSubmit={submitLogin} noValidate autoComplete="off">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={changeData}
          autoComplete="off"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={changeData}
          autoComplete="off"
        />
        <button
          type="submit"
          value="Send"
          disabled={formData.username === "" || formData.password === ""}
          onClick={submitLogin}
        >
          Login
        </button>
        <Link to="/register">Register user</Link>
      </form>
    </LoginFormStyled>
  );
};

export default LoginForm;
