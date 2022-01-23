import { useState, KeyboardEvent } from "react";
import { NewItemFormContainer, NewItemButton, NewItemInput } from "./styles";
import { useFocus } from "./utils/useFocus";

interface Props {
  onAdd(text: string): void;
}

export const NewItemForm = ({ onAdd }: Props) => {
  const [text, setText] = useState("");

  const inputRef = useFocus();

  const handleAddText = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd(text);
    }
  };

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
        onKeyPress={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
