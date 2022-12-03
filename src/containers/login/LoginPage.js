import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import "../../css/login.css";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/inputs/InputPassword";
import Input from "../../components/inputs/Input";

function LoginPage() {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("registration");
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

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

  console.log(errors);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <form onSubmit={handleSubmit(onSubmit)} className="login-page__form">
          <span className="login-page__form-over-login-text">
            Вход в аккаунт
          </span>
          <Input
            register={register("login", {
              required: "Поле логина обязательно к заполнению",
            })}
            placeholder="Логин"
          />
          {errors.login && (
            <span className="input-password__errors">
              {errors.login.message}
            </span>
          )}
          <InputPassword
            type={type}
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
                value:
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message:
                  "Пароль должен содержать цифры, а также буквы верхнего и нижнего регистров, и специальные символы",
              },
            })}
            errors={errors}
            icon={icon}
            toggleHandler={toggleHandler}
            placeholder="Пароль"
          />
          {errors.password && (
            <span className="input-password__errors">
              {errors.password.message}
            </span>
          )}
          <button className="login-page__form-button" type="submit">
            <span className="login-page__form-button-text">Войти</span>
          </button>
          <div
            className="login-page__form-under-login-text"
            onClick={onNavigate}
          >
            Ещё нет аккаунта?
          </div>
        </form>
      </div>
      <div className="login-page__right"></div>
    </div>
  );
}

export default LoginPage;
