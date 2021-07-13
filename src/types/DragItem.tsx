import React from "react";

export type ColumnDragItem = {
  index: number;
  id: number | string;
  text: string | undefined;
  type: "COLUMN";
};

export type DragItem = ColumnDragItem;
