import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";

import "./registration.css";

import Input from "../../blocks/input/Input";
import PasswordInput from "../../blocks/passwordInput/PasswordInput";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";

import * as api from "../../api/api";

export default function RegistrationPage() {
  const [snackbarState, setSnackbarState] = useState<
    { open: boolean; severity: 'success' | 'error'; message: string }>
    (
      { open: false, severity: 'success', message: '' }
    );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      await api.registration(data);

      navigate("/login");
      // setSnackbarState({ open: true, severity: 'success', message: 'Регистрация прошла успешно' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка регистрации' })
      console.error(error);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
      <span className="registration-form__title">Регистрация</span>
      {/* <div className="registration-form__password-input-component"> */}
      <TextField
        fullWidth
        {...register("fullName", {
          required: "ФИО обязательно к заполнению",
          pattern: {
            value:
              /^([А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?)(\s[А-ЯЁ][а-яё]+)?(\s[А-ЯЁ][а-яё]+)?$/i,
            message: "ФИО введено неверно",
          },
        })}
        id="fullName"
        label="ФИО"
        helperText={errors.fullName && String(errors.fullName.message)}
      />
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
        label="E-mail"
        helperText={errors.email && String(errors.email.message)}
      />

      {/* {errors.email ? (
          <span className="registration-form_errors">
            {errors.email ? String(errors.email.message) : "Введите e-mail"}
          </span>
        ) : (
          <span className="registration-form__helper-text">Введите e-mail</span>
        )} */}
      {/* </div> */}
      <FormControl fullWidth>
        <InputLabel>Звание</InputLabel>
        <Select
          {...register("rank", {
            required: "Поле звания обязательно к заполнению",
            // pattern: {
            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
            //   message: "Введён неверный e-mail",
            // },
          })}
          label="rank"
        >
          <MenuItem value={"Ассистент"}>Ассистент</MenuItem>
          <MenuItem value={"Преподаватель"}>Преподаватель</MenuItem>
          <MenuItem value={"Старший преподаватель"}>
            Старший преподаватель
          </MenuItem>
          <MenuItem value={"Доцент"}>Доцент</MenuItem>
          <MenuItem value={"Профессор"}>Профессор</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        {...register("position", {
          required: "Поле должности обязательно к заполнению",
        })}
        id="position"
        label="Должность"
        helperText={errors.position && String(errors.position.message)}
      />
      {/* <div className="registration-form__password-input-component"> */}
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
          <span className="registration-form_errors">
            {errors.password
              ? String(errors.password.message)
              : "Введите e-mail"}
          </span>
        ) : (
          <span className="registration-form__helper-text">Введите пароль</span>
        )} */}
      {/* </div> */}
      {/* <div className="registration-form__password-input-component"> */}
      {/* <PasswordInput
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
        id="repeatPassword"
        label="Повторите пароль"
        errorMessage={errors.repeatPassword?.message || ""}
      /> */}
      {/* {errors.repeatPassword ? (
          <span className="registration-form_errors">
            {errors.repeatPassword
              ? String(errors.repeatPassword.message)
              : "Введите e-mail"}
          </span>
        ) : (
          <span className="registration-form__helper-text">
            Повторите пароль
          </span>
        )} */}
      {/* </div> */}
      <OutlinedButton type="submit" text="Зарегистрироваться" />
      <OutlinedButton handleClick={() => navigate('/login')} text="Уже есть аккаунт?" />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarState((prevState) => ({ ...prevState, open: false }))}
      >
        <Alert
          onClose={() => setSnackbarState((prevState) => ({ ...prevState, open: false }))}
          severity={snackbarState.severity}
          variant="standard"
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
