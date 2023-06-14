import React from "react";

import Input from "../../blocks/input/Input";

export default function CheckboxInput({
  childKey,
  teachingUnitName,
  inputValue,
  register,
  id,
  teachingUnitId,
}) {
  return (
    <>
      <div key={childKey}>
        {"Тема №" + teachingUnitId + " " + teachingUnitName}
        <Input
          value={inputValue}
          register={register}
          id={id}
          label="Количество часов"
          variant="outlined"
        />
      </div>
    </>
  );
}
