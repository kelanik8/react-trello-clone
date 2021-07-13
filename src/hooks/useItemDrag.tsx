import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppState } from "../context/AppStateContext";
import { DragItem } from "../types/DragItem";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    item,
    begin: () =>
      dispatch({
        type: "SET_DRAGGED_ITEM",
        payload: item,
      }),
    end: () =>
      dispatch({
        type: "SET_DRAGGED_ITEM",
        payload: undefined,
      }),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
