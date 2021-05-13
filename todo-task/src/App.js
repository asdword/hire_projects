import React from 'react';
import './App.css';
import { TasksProvider } from './context/tasks/TasksState';
import TaskApp from './components/TaskApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <center className='text-light'>Hello World</center>

      </header>

        <TasksProvider >

          <TaskApp />

        </TasksProvider>

    </div>
  );
}

export default App;
