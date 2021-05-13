

export default function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      const tasks = state.tasks;
      console.log(tasks);
      const newIdentifier = tasks.length == 0 ?
        1
        :
        tasks[tasks.length - 1].id + 1;

      return {
        ...state,
        tasks: [...tasks, { ...action.payload, id: newIdentifier }],
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