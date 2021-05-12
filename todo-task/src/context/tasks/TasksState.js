import React, { createContext, useReducer } from 'react';

import taskReducer from './taskReducer';

const initialState = {
  tasks: [1,2,3,5]
};

export const TasksContext = createContext(initialState);

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  function addTask(task) {
    dispatch({
      type: "ADD_TASK",
      payload: task
    });
  }

  function editTask(task) {
    dispatch({
      type: "EDIT_TASK",
      payload: task
    });
  }

  function removeTask(id) {
    dispatch({
      type: "REMOVE_TASK",
      payload: id
    });
  }

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        editTask,
        removeTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};