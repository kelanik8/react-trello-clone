import React from "react";

interface Item {
  from?: number;
  to?: number;
}

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[];
}

export const moveItem = (array: List[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  console.log(item);
  array.splice(startIndex, 0, item);
  return array;
};
