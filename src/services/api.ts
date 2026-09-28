import { Task } from "../redux/taskSlice";

const mockTasks: Task[] = [
  { id: 1, title: "Learn Redux-Saga", completed: false },
  { id: 2, title: "Build TaskFlow App", completed: true },
];

export default {
  getTasks: (): Promise<Task[]> =>
    new Promise((resolve) => setTimeout(() => resolve(mockTasks), 1000)),
  addTask: (task: Omit<Task, "id">): Promise<Task> =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ id: Date.now(), ...task }), 1000)
    ),
};
