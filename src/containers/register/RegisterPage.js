import React, { useState } from "react";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/inputs/Input";
import InputPassword from "../../components/inputs/InputPassword";
import "../../css/register.css";
// import { getMainData } from "../../API/mainAPI";

function RegisterPage() {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate("/");
    // getMainData().then((resp) => {
    //   console.log("resp", resp);
    // });
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(eyeOff);
  const [repeatPasswordType, setRepeatPasswordType] = useState("password");
  const [repeatPasswordIcon, setRepeatPasswordIcon] = useState(eyeOff);

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
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="register-page">
      <div className="register-page__left">
        <form onSubmit={handleSubmit(onSubmit)} className="register-page__form">
          <span className="register-page__form-over-register-text">
            Регистрация
          </span>
          <Input
            register={register("fio", {
              required: "Поле ФИО обязательно к заполнению",
            })}
            placeholder="ФИО"
          />
          {errors.fio && (
            <span className="input-password__errors">{errors.fio.message}</span>
          )}
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
            type={passwordType}
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
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message:
                  "Пароль должен содержать цифры, а также буквы верхнего и нижнего регистров, и специальные символы",
              },
            })}
            errors={errors}
            icon={passwordIcon}
            toggleHandler={passwordToggleHandler}
            placeholder="Пароль"
          />
          {errors.password && (
            <span className="input-password__errors">
              {errors.password.message}
            </span>
          )}
          <InputPassword
            type={repeatPasswordType}
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
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message:
                  "Пароль должен содержать цифры, а также буквы верхнего и нижнего регистров, и специальные символы",
              },
            })}
            errors={errors}
            icon={repeatPasswordIcon}
            toggleHandler={repeatPasswordToggleHandler}
            placeholder="Повторите пароль"
          />
          {errors.repeatPassword && (
            <span className="input-password__errors">
              {errors.repeatPassword.message}
            </span>
          )}
          <button className="register-page__form-button" type="submit">
            <span className="register-page__form__button-text">
              Зарегистрироваться
            </span>
          </button>
          <div
            className="register-page__form-under-register-text"
            onClick={onNavigate}
          >
            Уже есть аккаунт?
          </div>
        </form>
      </div>
      <div className="register-page__right"></div>
    </div>
  );
}

export default RegisterPage;
