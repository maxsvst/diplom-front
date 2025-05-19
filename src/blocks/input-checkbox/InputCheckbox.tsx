import Input from "../input/Input";

interface InputProps {
  childKey: string;
  teachingUnitName: string;
  inputValue: string;
  register: object;
  id: string;
  teachingUnitId: string;
}

export default function CheckboxInput({
  childKey,
  teachingUnitName,
  inputValue,
  register,
  id,
  teachingUnitId,
}: InputProps) {
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
