import React from "react";
import { AppContainer } from "./styles/styles";
import { Column } from "./components/Column";
import { AddNewItem } from "./components/AddNewItem";
import { useAppState } from "./context/AppStateContext";
import { CustomDragLayer } from "./components/CustomDragLayerContainer";

import "./App.css";

interface State {
  count: number;
}

type Action = { type: "increment" } | { type: "decrement" };

function App() {
  // const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} id={list.id} index={i} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </AppContainer>
  );
}

export default App;
