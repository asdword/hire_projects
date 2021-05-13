import React, { createContext, useReducer } from 'react';

import taskReducer from './taskReducer';

const initialState = {
  tasks: [{
    id:1,
    status:'low',
    title:'some works',
    decs:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت '
  },
  {
    id:2,
    status:'medium',
    title:'other works',
    decs:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و '
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
        removeTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};