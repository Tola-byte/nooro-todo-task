export interface Task {
  id: number;
  title: string;
  color: string;
  completed?: boolean;
}

export interface TaskLists {
  listOfTasks: Task[];
}
