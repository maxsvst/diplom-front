import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./rpd-discipline.css";

import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function RpdDiscipline() {
  const [alignment, setAlignment] = useState("Дисциплина");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const navigate = useNavigate();

  const toAddRpd = () => {
    navigate("add-rpd");
  };

  const toShowRpd = () => {
    navigate("show-rpd");
  };

  const toAddDiscipline = () => {
    navigate("add-discipline");
  };

  const toEditDiscipline = () => {
    navigate("edit-discipline");
  };

  return (
    <div className="rpd-discipline">
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{
          my: "50px",
        }}
      >
        <ToggleButton
          sx={{ fontFamily: "Montserrat", fontSize: "20px" }}
          value="РПД"
        >
          РПД
        </ToggleButton>
        <ToggleButton
          sx={{ fontFamily: "Montserrat", fontSize: "20px" }}
          value="Дисциплина"
        >
          Дисциплина
        </ToggleButton>
      </ToggleButtonGroup>
      {alignment === "РПД" ? (
        <div>
          <OutlinedButton handleClick={toAddRpd} text="Добавить РПД" />
          {/* <OutlinedButton handleClick={toShowRpd} text="Название дисциплины" /> */}
        </div>
      ) : (
        <div>
          <OutlinedButton
            handleClick={toAddDiscipline}
            text="Добавить дисциплину"
          />
          {/* <OutlinedButton handleClick={toEditDiscipline} text="ТПР | 2023" /> */}
        </div>
      )}
    </div>
  );
}
