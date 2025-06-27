import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/users';
import { TextField, Button, Alert } from "@mui/material";
import Cookies from "js-cookie";
import "../Login/Login.css";

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = () => {
    setError('');
    setIsLoading(true);
      new UserService().register(login, password).then(res => {
        Cookies.set("x_access_", res.data.token);
        navigate('/');
      }).catch(err => {
          setError(err?.response?.data?.detail || 'Ошибка регистрации');
          setIsLoading(false);
      })
  };

  return (
    <div className="LoginPage">
      <div className="LoginPage__Header">Регистрация</div>
      <div className="LoginPage__LoginInputs">
        <TextField
          id="register-login"
          name="login"
          autoComplete="on"
          label="Введите логин"
          variant="outlined"
          className="LoginPage__LoginInput"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <TextField
          id="register-password"
          name="password"
          type="password"
          label="Введите пароль"
          variant="outlined"
          className="LoginPage__PasswordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : null}
      <Button
        disabled={isLoading}
        variant="outlined"
        className="LoginPage__LoginBtn"
        onClick={handleSubmit}
        type="button"
      >
        Зарегистрироваться
      </Button>
      <Button
        variant="text"
        className="LoginPage__RegisterBtn"
        onClick={() => navigate("/login")}
        style={{ marginTop: 16 }}
      >
        Назад к входу
      </Button>
    </div>
  );
};

export default Register;
