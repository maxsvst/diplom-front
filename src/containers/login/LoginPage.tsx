import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

import "./login.css";

import Input from "../../blocks/input/Input";
import PasswordInput from "../../blocks/passwordInput/PasswordInput";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";
import { TextField } from "@mui/material";

import * as api from "../../api/api";

export default function LoginPage() {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const toRigestration = () => {
    navigate("registration");
  };

  const toRpdDiscipline = () => {
    navigate("rpd-discipline");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await api.login(data);
      toRpdDiscipline();
      console.log("login", response);
    } catch (error: any) {
      setError(error);
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
      <OutlinedButton handleClick={toRigestration} text="Ещё нет аккаунта?" />
    </form>
  );
}
