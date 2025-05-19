import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface SwitchButtonProps {
  alignment: boolean;
  handleChange:
    | ((event: React.MouseEvent<HTMLElement>, value: any) => void)
    | undefined;
}

export default function SwitchButton({
  alignment,
  handleChange,
}: SwitchButtonProps) {
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
