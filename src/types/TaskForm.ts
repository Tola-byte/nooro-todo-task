export interface CreateTaskFormProps {
  onAddTask: (task: {
    id?: number;
    title: string;
    color: string;
    completed?: boolean;
  }) => void;

  // come back to check here sha
  onEditTask: (updates: {
    id: number;
    title: string;
    color: string;
    completed?: boolean;
  }) => void;
  onBack: () => void;
  mutatedTask: {
    title: string;
    color: string;
    id?: number;
    completed?: boolean;
  };
  buttonType: string;
  setTaskText: (task: string) => void;
  selectedColor?: string;
  setSelectedColor: (color: string) => void;
}
