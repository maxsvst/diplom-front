import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Topic } from "../../types";

interface DisciplineSelectorProps {
  topics: Partial<Topic>[];
  selectedTopic: Partial<Topic> | null;
  onTopicSelect: (topic: Partial<Topic>) => void;
  isDisabled?: boolean;
}

export const TopicSelector = ({
  topics,
  selectedTopic,
  onTopicSelect,
  isDisabled = false,
}: DisciplineSelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selected = topics.find(
      ({ topicId }) => topicId === event.target.value
    );
    if (selected) {
      onTopicSelect(selected);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="topic-select-label">Выберите тему</InputLabel>
      <Select
        labelId="topic-select-label"
        id="topic-select"
        value={selectedTopic?.topicId || ""}
        label="Выберите тему"
        onChange={handleChange}
        disabled={isDisabled}
      >
        {!!topics &&
          topics.map(({ topicId, topicName }) => (
            <MenuItem key={topicId} value={topicId}>
              {topicName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
