import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

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
    console.log(data);
  };

  return (
    <div className="">
      <div className="">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("email", {
              required: "Поле e-mail обязательно к заполнению",
              pattern: {
                value: /()/,
                message: "Введён неверный e-mail",
              },
            })}
            id="email"
            label="Электронная почта"
          />
          {errors.email && <span className="">{errors.email.message}</span>}
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
          {errors.password && (
            <span className="">{errors.empasswordail.message}</span>
          )}
          <OutlinedButton
            type="submit"
            handleClick={toRpdDiscipline}
            text="Авторизоваться"
          />
          <OutlinedButton
            handleClick={toRigestration}
            text="Ещё нет аккаунта?"
          />
        </form>
      </div>
    </div>
  );
}
