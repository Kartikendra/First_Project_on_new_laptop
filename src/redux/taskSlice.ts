import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  list: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  list: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskRequest: (state, action: PayloadAction<Omit<Task, "id">>) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    addTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;
