import React, { useState } from "react";
import { useFocus } from "../hooks/useFocus";
import {
  NewItemFormContainer,
  NewItemButton,
  NewItemInput,
} from "../styles/styles";

interface NewItemProps {
  onAdd(text: string): void;
}

export const NewItemForm: React.FC<NewItemProps> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();

  return (
    <NewItemFormContainer>
      <NewItemInput
        value={text}
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
