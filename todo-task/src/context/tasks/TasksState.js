import React, { createContext, useReducer } from 'react';

import taskReducer from './taskReducer';

const initialState = {
  tasks: [{
    id: 1,
    status: 'low',
    title: 'some works',
    decs: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 2,
    status: 'medium',
    title: 'other works',
    decs: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,'
  }]
}



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
        removeTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};