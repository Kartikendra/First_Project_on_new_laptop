import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import taskReducer from "./taskSlice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

function loggerMiddleware(store: any) {
  return function (next: any) {
    return function (action: any) {
      console.log("Dispatching action:", action);
      return next(action);
    };
  };
}

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, loggerMiddleware),
});

sagaMiddleware.run(rootSaga);
export default store; 
// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
