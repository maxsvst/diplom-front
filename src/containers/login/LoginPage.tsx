import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { CookiesProvider } from "react-cookie";

import "./login.css";

import Input from "../../blocks/input/Input";
import PasswordInput from "../../blocks/passwordInput/PasswordInput";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";
import { Alert, Snackbar, TextField } from "@mui/material";

import * as api from "../../api/api";

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  // const [cookies, setCookie, removeCookie] = useCook(['cookie-name']);
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (loginData: FieldValues) => {
    try {
      const { accessToken } = await api.login(loginData);
      localStorage.setItem("access-token", accessToken);
      navigate("/parse-docs");
      // setSnackbarState({ open: true, severity: 'success', message: 'Аутентификация прошла успешно' })
    } catch (error) {
      setSnackbarState({
        open: true,
        severity: "error",
        message: "Ошибка авторизации",
      });
      console.error(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <span className="login-form__title">Авторизация</span>
      {/* <div className="login-form__password-input-component"> */}
      <TextField
        fullWidth
        {...register("email", {
          required: "Поле e-mail обязательно к заполнению",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            message: "Введён неверный e-mail",
          },
        })}
        id="email"
        label="Электронная почта"
        helperText={errors.email && String(errors.email.message)}
      />
      {/* {errors.email ? (
          <span className="login-form_errors">
            {errors.email ? String(errors.email.message) : "Введите e-mail"}
          </span>
        ) : (
          <span className="login-form__helper-text">Введите e-mail</span>
        )} */}
      {/* </div> */}
      {/* <div className="login-form__password-input-component"> */}
      <PasswordInput
        register={register("password", {
          required: "Поле пароля обязательно к заполению",
          minLength: {
            value: 8,
            message: "Пароль должен содержать больше 8-ми символов",
          },
          maxLength: {
            value: 20,
            message: "Пароль должен содержать меньше 20-ти символов",
          },
          pattern: {
            value: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/,
            message:
              "Пароль должен содержать цифры, а также буквы верхнего и нижнего регистров, и специальные символы",
          },
        })}
        id="password"
        label="Пароль"
        errorMessage={errors.password?.message || ""}
      />
      {/* {errors.password ? (
          <span className="login-form_errors">
            {errors.password
              ? String(errors.password.message)
              : "Введите e-mail"}
          </span>
        ) : (
          <span className="login-form__helper-text">Введите пароль</span>
        )} */}
      {/* </div> */}
      <OutlinedButton type="submit" text="Войти" />
      <OutlinedButton
        handleClick={() => navigate("/registration")}
        text="Ещё нет аккаунта?"
      />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={() =>
          setSnackbarState((prevState) => ({ ...prevState, open: false }))
        }
      >
        <Alert
          onClose={() =>
            setSnackbarState((prevState) => ({ ...prevState, open: false }))
          }
          severity={snackbarState.severity}
          variant="standard"
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
