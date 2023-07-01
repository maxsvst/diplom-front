import React, { useState } from "react";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./registration.css";

import Input from "../../blocks/input/Input";
import PasswordInput from "../../blocks/passwordInput/PasswordInput";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";

export default function RegistrationPage() {
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [repeatPasswordType, setRepeatPasswordType] = useState("password");
  const [repeatPasswordIcon, setRepeatPasswordIcon] = useState(eyeOff);

  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/");
  };

  const passwordToggleHandler = () => {
    if (passwordType === "password") {
      setPasswordIcon(eye);
      setPasswordType("text");
    } else {
      setPasswordIcon(eyeOff);
      setPasswordType("password");
    }
  };

  const repeatPasswordToggleHandler = () => {
    if (repeatPasswordType === "password") {
      setRepeatPasswordIcon(eye);
      setRepeatPasswordType("text");
    } else {
      setRepeatPasswordIcon(eyeOff);
      setRepeatPasswordType("password");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <span className="registration-form__title">Регистрация</span>
      <div className="registration-form__password-input-component">
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
          <span className="registration-form_errors">
            {errors.email ? errors.email.message : "Введите e-mail"}
          </span>
        ) : (
          <span className="registration-form__helper-text">Введите e-mail</span>
        )}
      </div>
      <div className="registration-form__password-input-component">
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
          type={passwordType}
          id="password"
          label="Пароль"
          icon={passwordIcon}
          toggleHandler={passwordToggleHandler}
        />
        {errors.password ? (
          <span className="registration-form_errors">
            {errors.password ? errors.password.message : "Введите e-mail"}
          </span>
        ) : (
          <span className="registration-form__helper-text">Введите пароль</span>
        )}
      </div>
      <div className="registration-form__password-input-component">
        <PasswordInput
          register={register("repeatPassword", {
            required: "Поле повторения пароля обязательно к заполению",
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
            validate: (vaule) => {
              if (watch("password") !== vaule) {
                return "Пароли не совпадают";
              }
            },
          })}
          type={repeatPasswordType}
          id="repeatPassword"
          label="Повторите пароль"
          icon={repeatPasswordIcon}
          toggleHandler={repeatPasswordToggleHandler}
        />
        {errors.repeatPassword ? (
          <span className="registration-form_errors">
            {errors.repeatPassword
              ? errors.repeatPassword.message
              : "Введите e-mail"}
          </span>
        ) : (
          <span className="registration-form__helper-text">
            Повторите пароль
          </span>
        )}
      </div>
      <OutlinedButton
        type="submit"
        handleClick={handleSubmit}
        text="Зарегистрироваться"
      />
      <OutlinedButton handleClick={toLogin} text="Уже есть аккаунт?" />
    </form>
  );
}
