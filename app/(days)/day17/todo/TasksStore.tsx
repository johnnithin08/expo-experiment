import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { dummyTasks, TTask } from "./TasksContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TasksStore = {
    tasks: TTask[];
    onAddTask: (task: string) => void;
    onDelete: (id: number) => void;
    onItemPressed: (id: number) => void;
    getFilteredTasks: (tab: string, search: string) => TTask[];
};

export const useTasksStore = create(
    persist<TasksStore>(
        (set, get) => ({
            tasks: dummyTasks,
            onAddTask: (newTask: string) => {
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        { title: newTask, isFinished: false, id: state.tasks.length + 1 },
                    ],
                }));
            },
            onDelete: (id: number) => {
                set((state) => ({ tasks: state.tasks.filter((eachTask) => eachTask.id !== id) }));
            },
            onItemPressed: (id: number) => {
                set((state) => ({
                    tasks: state.tasks.map((eachTask) =>
                        eachTask.id !== id
                            ? eachTask
                            : { ...eachTask, isFinished: !eachTask.isFinished },
                    ),
                }));
            },
            getFilteredTasks: (tab: string, search: string) => {
                const tasks = get().tasks;
                return tasks.filter((eachTask) => {
                    if (eachTask.isFinished && tab === "Todo") {
                        return false;
                    }
                    if (!eachTask.isFinished && tab === "Finished") {
                        return false;
                    }
                    if (!search) {
                        return true;
                    }
                    return eachTask.title.toLowerCase().trim().includes(search.toLowerCase());
                });
            },
        }),
        {
            name: "tasks-store",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
