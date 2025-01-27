'use client';

import { Button } from '@/components/Buttons/PrimaryButton';
import TaskList from '@/components/TaskLists/TaskList';
import { useState, useEffect } from 'react';
import { CreateTaskForm } from '@/components/Form/TaskForm';
import { addTask, fetchTasks } from '@/services/taskService';
import { Task } from '@/types/TaskList';
import { LoadingSpinner } from '@/components/Loader/Loader';

export default function Home() {
  const [view, setView] = useState<'home' | 'create'>('home');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        setError('Failed to fetch tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleAddTask = async (task: { title: string; color: string }) => {
    try {
      await addTask(task);
      const data = await fetchTasks();
      setTasks(data);
      //setTasks([...tasks, newTask]);
      setTitle('');
      setColor('');
      setView('home');
    } catch (error) {
      setError('Failed to add task. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className=" flex justify-center items-center justify-items-center font-inter">
      <div className="absolute top-60 w-6/7 md:w-1/2">
        {view === 'home' ? (
          <>
            <div className="absolute -top-16 w-full flex ">
              <Button
                text={'Create Task'}
                icon={'/plus1.svg'}
                onClick={() => setView('create')}
              />
            </div>
            <TaskList listOfTasks={tasks} />
          </>
        ) : (
          <CreateTaskForm
            onEditTask={() => {}}
            onAddTask={handleAddTask}
            onBack={() => setView('home')}
            mutatedTask={{
              title: title,
              color: color,
            }}
            buttonType={'home'}
            setTaskText={setTitle}
            setSelectedColor={setColor}
          />
        )}
      </div>
    </div>
  );
}
