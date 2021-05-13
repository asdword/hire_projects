import React from 'react'
import { TasksContext } from '../context/tasks/TasksState'

export default function ArchivedTaskList() {
    const { tasks } = React.useContext(TasksContext)
    const archivedTasks = tasks.filter(each => each.status === 'done')

    return (
        <div>
            <ui>
                {archivedTasks.map((each, index) =>
                    <li key={index}>
                        {each?.title}
                    </li>
                )}
            </ui>
        </div>
    )
}
