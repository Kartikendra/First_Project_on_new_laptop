import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
  Task,
} from "../taskSlice";
import api from "../../services/api";

function* fetchTasks() {
  try {
    const tasks: Task[] = yield call(api.getTasks);
    yield put(fetchTasksSuccess(tasks));
  } catch (error: any) {
    yield put(fetchTasksFailure(error.message));
  }
}

function* addTask(action: ReturnType<typeof addTaskRequest>) {
  try {
    const newTask: Task = yield call(api.addTask, action.payload);
    yield put(addTaskSuccess(newTask));
  } catch (error: any) {
    yield put(addTaskFailure(error.message));
  }
}

export default function* taskSaga() {
  yield takeLatest(fetchTasksRequest.type, fetchTasks);
  yield takeLatest(addTaskRequest.type, addTask);
}
