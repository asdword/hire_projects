

export default function taskReducer(state, action) {
    switch (action.type) {
      case "ADD_TASK":
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
  
      case "EDIT_TASK":
        const updatedTask = action.payload;
  
        const updatedTasks = state.tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          return task;
        });
  
        return {
          ...state,
          tasks: updatedTasks,
        };
  
      case "REMOVE_TASK":
        return {
          ...state,
          tasks: state.tasks.filter(
            (task) => task.id !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };