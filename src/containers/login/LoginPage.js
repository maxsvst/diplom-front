import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import "./login.css";

import Input from "../../blocks/input/Input";
import PasswordInput from "../../blocks/passwordInput/PasswordInput";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";

export default function LoginPage() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const navigate = useNavigate();

  const toRigestration = () => {
    navigate("registration");
  };

  const toRpdDiscipline = () => {
    navigate("rpd-discipline");
  };

  const toggleHandler = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    toRpdDiscipline();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <span className="login-form__title">Авторизация</span>
      <div className="login-form__password-input-component">
        <Input
          register={register("email", {
            required: "Поле e-mail обязательно к заполнению",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: "Введён неверный e-mail",
            },
          })}
          id="email"
          label="Электронная почта"
        />
        {errors.email ? (
          <span className="login-form_errors">
            {errors.email ? errors.email.message : "Введите e-mail"}
          </span>
        ) : (
          <span className="login-form__helper-text">Введите e-mail</span>
        )}
      </div>
      <div className="login-form__password-input-component">
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
          type={type}
          id="password"
          label="Пароль"
          icon={icon}
          toggleHandler={toggleHandler}
        />
        {errors.password ? (
          <span className="login-form_errors">
            {errors.password ? errors.password.message : "Введите e-mail"}
          </span>
        ) : (
          <span className="login-form__helper-text">Введите пароль</span>
        )}
      </div>
      <OutlinedButton type="submit" handleClick={handleSubmit} text="Войти" />
      <OutlinedButton handleClick={toRigestration} text="Ещё нет аккаунта?" />
    </form>
  );
}
