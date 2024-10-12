import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ITasksContext {
    tasks: TTask[];
    setTasks: (newValue: TTask[]) => void;
    onAddTask: (item: string) => void;
    onItemPressed: (id: number) => void;
    onDelete: (id: number) => void;
    getFilteredTasks: (tab: string, search: string) => TTask[];
}

export const TasksContext = createContext<ITasksContext>({
    tasks: [],
    setTasks: () => {},
    onAddTask: () => {},
    onItemPressed: () => {},
    onDelete: () => {},
    getFilteredTasks: () => [],
});

export type TTask = {
    title: string;
    isFinished: boolean;
    id: number;
};

export const dummyTasks: TTask[] = [
    {
        title: "Setup Day 15 structure",
        isFinished: true,
        id: 1,
    },
    {
        title: "Render a list of tasks",
        isFinished: false,
        id: 2,
    },
    {
        title: "Add a new task",
        isFinished: false,
        id: 3,
    },
    {
        title: "Cahnge status of task",
        isFinished: false,
        id: 4,
    },
    {
        title: "Separate in 2 tabs",
        isFinished: false,
        id: 5,
    },
];

export const TasksContextProvider = ({ children }: PropsWithChildren) => {
    const [tasks, setTasks] = useState<TTask[]>([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        saveData();
    }, [tasks]);

    const onItemPressed = (id: number) => {
        const updatedTasks = [...tasks];
        setTasks(
            updatedTasks.map((eachTask) =>
                eachTask.id !== id ? eachTask : { ...eachTask, isFinished: !eachTask.isFinished },
            ),
        );
    };

    const saveData = async () => {
        try {
            const jsonValue = JSON.stringify(tasks);
            await AsyncStorage.setItem("tasks", jsonValue);
        } catch (e) {
            Alert.alert("Erro in async");
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("tasks");
            if (jsonValue) {
                return setTasks(JSON.parse(jsonValue));
            }
            setTasks(dummyTasks);
        } catch (e) {
            Alert.alert("Erro in async");
        }
    };

    const onDelete = (id: number) => {
        const updatedTasks = [...tasks];
        setTasks(updatedTasks.filter((eachTask) => eachTask.id !== id));
    };

    const onAddTask = (newTask: string) => {
        const updatedTasks = [...tasks];
        const newId = tasks.length + 1;
        updatedTasks.push({ title: newTask, isFinished: false, id: newId });
        setTasks(updatedTasks);
    };

    const getFilteredTasks = (tab: string, search: string) => {
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
    };
    return (
        <TasksContext.Provider
            value={{ tasks, setTasks, onItemPressed, onDelete, getFilteredTasks, onAddTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);
