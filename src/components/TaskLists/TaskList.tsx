'use client';
import React, { useState } from 'react';
import { CreateTaskForm } from '../Form/TaskForm';
import { ConfirmationModal } from '../ConfirmationModal/Modal';
import { Task, TaskLists } from '@/types/TaskList';
import { deleteTask, editTask } from '@/services/taskService';
import { showErrorToast } from '@/utils/toast';
import { handleError } from '@/utils/errorHandler';

const TaskList: React.FC<TaskLists> = ({ listOfTasks }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(listOfTasks);
  const [taskToEdit, setTaskToEdit] = useState<Task>({
    title: '',
    id: 0,
    color: '',
  });
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleTaskCompletion = async (id: number) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) return;

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);

      await editTask({ ...taskToUpdate, completed: !taskToUpdate.completed });
    } catch (error) {
      const errorMessage = handleError(error);
      showErrorToast(errorMessage);
    }
  };

  const handleDeleteTask = async () => {
    if (taskToDelete === null) return;

    try {
      await deleteTask(taskToDelete);
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setOpenDeleteModal(false);
    } catch (error) {
      const errorMessage = handleError(error);
      showErrorToast(errorMessage);
    }
  };

  const handleEditTask = async (updates: Task) => {
    try {
      const updatedTask = await editTask(updates);
      setTasks(
        tasks.map((task) => (task.id === updates.id ? updatedTask : task))
      );
      setOpenEdit(false);
    } catch (error) {
      const errorMessage = handleError(error);
      showErrorToast(errorMessage);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div className=" text-white py-6 rounded-lg w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-inter flex gap-2 font-700 text-[#4ea8de]">
          Tasks
          <div className="w-5 h-5 flex items-center justify-center bg-[#333333] rounded-full shadow-lg">
            <span className="text-[12px] font-bold text-[#D9D9D9]">
              {tasks.length}
            </span>
          </div>
        </h1>
        <span className="text-sm flex gap-2 text-[#8284FA] font-medium">
          Completed
          <div className="max-w-[52px] px-1.5 flex items-center justify-center bg-[#333333] rounded-full shadow-lg">
            <span className="text-[12px] font-bold text-[#D9D9D9]">
              {completedTasks.length === 0
                ? 0
                : `${completedTasks.length} of ${tasks.length}`}
            </span>
          </div>
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col gap-8 justify-center text-center py-10">
          <img src="/clipboard.svg" className="m-auto" alt="svg-icon" />
          <div className="flex flex-col gap-8">
            <p className="text-gray-400">
              You don&#39;t have any tasks registered yet.
            </p>
            <p className="text-sm text-gray-500">
              Create tasks and organize your to-do items.
            </p>
          </div>
        </div>
      ) : (
        <ul className="w-full space-y-4 ">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center bg-[#333333] p-4 rounded-lg ${
                task.completed
                  ? 'bg-gray-800 line-through text-gray-400'
                  : 'bg-gray-800 text-[#f2f2f2] '
              }`}
            >
              <div className="flex items-center gap-2">
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="w-3 h-3 md:w-5 md:h-5 md:mt-2 appearance-none border-2 border-[#4ea8de] 
                                rounded-full checked:bg-[#5E60CE] checked:border-none"
                  />
                </div>

                <span className="font-inter text-[11px] w-[200px] md:w-full md:text-sm font-[400]">
                  {task.id}. {task.title}
                </span>
              </div>
              <div className="flex justify-end">
                <div
                  className="w-3 h-3 mt-2 md:mt-0 md:w-6 md:h-6 mr-4 rounded-full"
                  style={{ backgroundColor: task.color }}
                  title={task.color}
                />
                <button
                  onClick={() => {
                    setOpenEdit((prev) => !prev);
                    setTaskToEdit({
                      title: task.title,
                      color: task.color,
                      completed: task.completed,
                      id: task.id,
                    });
                  }}
                >
                  <img src={'/edit.svg'} alt="edit" />
                </button>
                <button
                  onClick={() => {
                    setTaskToDelete(task.id);
                    setOpenDeleteModal(true);
                  }}
                >
                  <img src={'/trash.svg'} alt="trash" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ConfirmationModal
        isOpen={openDeleteModal}
        onConfirm={handleDeleteTask}
        onCancel={() => setOpenDeleteModal(false)}
        message={`Are you sure you want to delete Task ${taskToDelete}?`}
      />
      {openEdit && taskToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-[#1E1E1E] p-6 rounded-lg md:max-w-3xl w-[92%] md:mx-4">
            <CreateTaskForm
              onAddTask={() => {}}
              onEditTask={handleEditTask}
              mutatedTask={taskToEdit}
              onBack={() => setOpenEdit(false)}
              buttonType={'edit'}
              setTaskText={(title) => setTaskToEdit({ ...taskToEdit, title })}
              setSelectedColor={(color) =>
                setTaskToEdit({ ...taskToEdit, color })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
