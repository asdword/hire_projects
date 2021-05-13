import React from 'react'
import { Button, Container } from '@material-ui/core'
import { TasksContext } from '../context/tasks/TasksState'

import FormDialog from './FormDialog';
import TaskForm from './TaskForm';
import { ADD, VIEW, ARCHIVE, EDIT } from '../constant';
import TaskList from './TaskList';
import ArchivedTaskList from './ArchivedTaskList';

export default function TaskApp() {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectTask, setSelectTask] = React.useState()
    const [dialogData, setDialogData] = React.useState()
    const { tasks, addTask, editTask, removeTask } = React.useContext(TasksContext)
    const activeTasks = tasks.filter(each => each.status !== 'done')


    const onCloseDialog = () => setOpenDialog(false)

    const show_initDialog = (mode, id, e) => {
        const task = activeTasks.find(each => each.id == id);

        setDialogDataByMode(mode)
        setOpenDialog(true);
        setSelectTask(task);
    }
    const handleOpenArchiveTasks = () => show_initDialog(ARCHIVE)

    const setDialogDataByMode = (mode) => {
        let title = null;
        switch (mode) {
            case ADD:
                title = 'Create a new task'
                break;
            case EDIT:
                title = 'Edit task'
                break;

            case VIEW:
                title = 'View task'
                break;

            case ARCHIVE:
                title = 'Archive task'
                break;

        }
        setDialogData({ mode, title });

    }

    //NOTE
    //task form actions
    const handleOnSaveTask = (task) => {
        if (task.id > 0)
            editTask(task)
        else
            addTask(task)
        setOpenDialog(false);
    }
    const handleOnDoneTask = (id, e) => {
        e.stopPropagation();
        const task = activeTasks.find(each => each.id == id)
        if (task) {
            task.status = 'done';
            editTask(task)
        }
        setOpenDialog(false);
    }
    const handleOnEditMode = () =>
        setDialogDataByMode(EDIT)

    const handleOnDeleteTask = (id) => {
        removeTask(id)
        setOpenDialog(false);
    }

    return (
        <Container>

            <TaskList
                onOpenTask={show_initDialog}
                onArchiveTask={handleOnDoneTask}
                onOpenArchiveTasks={handleOpenArchiveTasks}
                activeTasks={activeTasks} />

            <FormDialog open={openDialog} title={dialogData?.title} handleClose={onCloseDialog}>
                <DialogContentDaynamic
                    mode={dialogData?.mode}
                    {...selectTask}

                    onSaveTask={handleOnSaveTask}
                    onDoneTask={handleOnDoneTask}
                    onEditMode={handleOnEditMode}
                    onDeleteTask={handleOnDeleteTask} />
            </FormDialog>

        </Container>
    )
}


function DialogContentDaynamic({ mode, ...props }) {
    switch (mode) {
        case ADD:
        case VIEW:
        case EDIT:
            return <TaskForm {...props} mode={mode} />

        case ARCHIVE:
            return <ArchivedTaskList />

        default:
            return null
    }
}