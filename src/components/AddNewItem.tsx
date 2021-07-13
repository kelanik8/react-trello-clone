import React, { useState } from "react";
import { AddItemButton } from "../styles/styles";
import { NewItemForm } from "./NewItemForm";

interface AddNewItemProps {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
}

export const AddNewItem: React.FC<AddNewItemProps> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;

  if (showForm) {
    //   FORM
    return (
      <NewItemForm
        onAdd={(text) => {
          if (!text) {
            alert("Field is required");
            return;
          }
          onAdd(text);
          setShowForm(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
