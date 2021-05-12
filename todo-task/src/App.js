import React from 'react';
import './App.css';
import { TasksProvider } from './context/tasks/TasksState';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <center className='text-light'>Hello World</center>

      </header>

        <TasksProvider >

          <TaskList />

        </TasksProvider>

    </div>
  );
}

export default App;
