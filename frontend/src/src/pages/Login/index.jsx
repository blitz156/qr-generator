import "./Login.css";
import { TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import UserService from "../../services/users";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const authenticate = () => {
    setIsLoading(true);

    new UserService()
      .authenticate(username, password)
      .then((response) => {
        Cookies.set("x_access_", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__Header">Войти в систему</div>
      <div className="LoginPage__LoginInputs">
        <TextField
          id="outlined-basic"
          name="user"
          autoComplete="on"
          label="Введите логин"
          variant="outlined"
          className="LoginPage__LoginInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          name="user"
          type="password"
          label="Введите пароль"
          variant="outlined"
          className="LoginPage__PasswordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {isError ? (
        <Alert severity="error">Введен неверный логин или пароль</Alert>
      ) : null}
      <Button
        disabled={isLoading}
        variant="outlined"
        className="LoginPage__LoginBtn"
        onClick={authenticate}
      >
        Войти
      </Button>
      <Button
        variant="text"
        className="LoginPage__RegisterBtn"
        onClick={() => navigate("/register")}
        style={{ marginTop: 16 }}
      >
        Регистрация
      </Button>
    </div>
  );
};

export default Login;
