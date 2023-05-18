import React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function SwitchButton(alignment, handleChange) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="РПД">РПД</ToggleButton>
      <ToggleButton value="Дисциплина">Дисциплина</ToggleButton>
    </ToggleButtonGroup>
  );
}
