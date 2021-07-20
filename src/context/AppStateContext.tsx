import React, { createContext, useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { findItemIndexById } from "../utils/findItemIndexById";
import { moveItem } from "../utils/moveItem";
import { type } from "os";
import { DragItem } from "../types/DragItem";

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

interface AppState {
  lists: List[];
  draggedItem?: DragItem | undefined;
}

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: "ADD_LIST"; payload: string }
  | {
      type: "ADD_TASK";
      payload: {
        taskId: string;
        text: string;
      };
    }
  | {
      type: "MOVE_LIST";
      payload: {
        dragIndex: number;
        hoverIndex: number;
      };
    }
  | {
      type: "SET_DRAGGED_ITEM";
      payload?: DragItem | undefined;
    };

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "Board 1",
      tasks: [
        {
          id: "a0",
          text: "Task 1",
        },
        {
          id: "a1",
          text: "Task 2",
        },
        {
          id: "a2",
          text: "Task 3",
        },
      ],
    },
    {
      id: "1",
      text: "Board 2",
      tasks: [
        {
          id: "b0",
          text: "Task 1",
        },
        {
          id: "b1",
          text: "Task 2",
        },
        {
          id: "b2",
          text: "Task 3",
        },
      ],
    },
    {
      id: "2",
      text: "Board 3",
      tasks: [
        {
          id: "c0",
          text: "Task 1",
        },
        {
          id: "c1",
          text: "Task 2",
        },
        {
          id: "c2",
          text: "Task 3",
        },
      ],
    },
  ],
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: uuidv4(),
            text: action.payload,
            tasks: [],
          },
        ],
      };
    }
    case "ADD_TASK": {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.taskId
      );
      state.lists[targetLaneIndex].tasks.push({
        id: uuidv4(),
        text: action.payload.text,
      });
      return {
        ...state,
      };
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      state.lists = moveItem(state.lists, dragIndex, hoverIndex);
      console.log(moveItem(state.lists, dragIndex, hoverIndex));
      return { ...state };
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(AppStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
