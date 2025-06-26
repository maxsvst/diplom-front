import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Discipline } from "../../types";

interface DisciplineSelectorProps {
  disciplines: Partial<Discipline>[];
  selectedDiscipline: Partial<Discipline> | null;
  onDisciplineSelect: (discipline: Partial<Discipline>) => void;
  isDisabled?: boolean;
}

export const DisciplineSelector = ({
  disciplines,
  selectedDiscipline,
  onDisciplineSelect,
  isDisabled = false,
}: DisciplineSelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selected = disciplines.find(
      ({ disciplineId }) => disciplineId === event.target.value
    );

    if (selected) {
      onDisciplineSelect(selected);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="discipline-select-label">Выберите дисциплину</InputLabel>
      <Select
        labelId="discipline-select-label"
        id="discipline-select"
        value={selectedDiscipline?.disciplineId || ""}
        label="Выберите дисциплину"
        onChange={handleChange}
        disabled={isDisabled}
      >
        {!!disciplines &&
          disciplines.map(({ disciplineId, fullName }) => (
            <MenuItem
              key={disciplineId}
              value={disciplineId}
            >
              {fullName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
