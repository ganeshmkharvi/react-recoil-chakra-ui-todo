import { atom } from "recoil";
import { TodoContent } from '../interfaces/TodoContent';

export const todoContentState = atom<TodoContent[]>({
    key: "todoContents",
    default: [
        { id: '1', description: 'Incomplete task', isCompleted: false },
        { id: '2', description: 'Not completed task', isCompleted: false },
        { id: '3', description: 'Completed task', isCompleted: true }
      ]
});

export const toggleIsCompleteState = atom<boolean>({
    key: "todoCompleteState",
    default: true,
});
