import React from "react";

import Input from "../../blocks/input/Input";
import Checkbox from "@mui/material/Checkbox";

const CheckboxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CheckboxInput({
  childKey,
  onChange,
  checkboxValue,
  teachingUnitName,
  inputValue,
  register,
  id,
}) {
  return (
    <>
      <div key={childKey}>
        <Checkbox
          onChange={onChange}
          value={checkboxValue}
          {...CheckboxLabel}
        />
        {teachingUnitName}
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
