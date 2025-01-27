import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '../Buttons/PrimaryButton';
import { taskColors } from '@/config/config';
import { CreateTaskFormProps } from '@/types/TaskForm';

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onAddTask,
  buttonType,
  mutatedTask,
  setSelectedColor,
  onEditTask,
  setTaskText,
  onBack,
}) => {
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mutatedTask?.title.trim() !== '' && buttonType !== 'edit') {
      onAddTask({ title: mutatedTask.title, color: mutatedTask?.color });
    }
    if (buttonType === 'edit') {
      onEditTask({
        id: mutatedTask.id || 0,
        title: mutatedTask.title,
        color: mutatedTask.color,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded-lg max-w-3xl mx-auto"
    >
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-blue-500 hover:underline"
        >
          <Image src={'/arrow-left.svg'} width={20} height={20} alt="icon" />
        </button>
      </div>
      <div>
        <label
          htmlFor="taskText"
          className="block mb-2 text-sm font-[700] text-[#4EA8DE]"
        >
          Title
        </label>
        <input
          id="taskText"
          type="text"
          value={mutatedTask.title}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Ex. Brush your teeth"
          className="w-full rounded font-inter bg-[#3333] text-sm p-4 text-white focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="taskText"
          className="block mb-2 text-sm font-[700] text-[#4EA8DE]"
        >
          Color
        </label>
        <span className="flex gap-2 w-3/4">
          {taskColors.map((task) => (
            <div
              key={task.id}
              onClick={() => handleColorClick(task.color)}
              className={`w-20 h-[18px] md:w-16 md:h-[52px] rounded-full cursor-pointer transition-all duration-300
                             ${
                               mutatedTask.color === task.color
                                 ? 'outline outline-4 outline-[#4ea8de]'
                                 : ''
                             }`}
              style={{ backgroundColor: task.color }}
            />
          ))}
        </span>
      </div>
      <div className="flex w-full gap-4">
        <Button
          text={buttonType === 'edit' ? 'Save' : 'Add Task'}
          icon={buttonType === 'edit' ? '/tick.svg' : '/plus1.svg'}
        />
      </div>
    </form>
  );
};
