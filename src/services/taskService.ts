import { Task } from '@/types/TaskList';
import axios from 'axios';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getTasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const addTask = async (task: { title: string; color: string }) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/postTasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const editTask = async (updates: Task) => {
  try {
    const response = await axios.put(
      `${BASE_API_URL}/editTasks/${updates.id}`,
      updates
    );
    return response.data;
  } catch (error) {
    console.error('Error editing task:', error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_API_URL}/deleteTasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
