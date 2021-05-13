import { Box, Button, Container, Divider, Fab, List, makeStyles } from '@material-ui/core'
import React from 'react'
import { TasksContext } from '../context/tasks/TasksState'
import { Add } from '@material-ui/icons';
import TaskCard from './TaskCard';
import FormDialog from './FormDialog';
import TaskForm from './TaskForm';
import { ADD, VIEW, ARCHIVE, EDIT } from '../constant';

export default function TaskList() {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectTask, setSelectTask] = React.useState()
    const [dialogData, setDialogData] = React.useState()
    const { tasks } = React.useContext(TasksContext)
    const isempty = tasks.length === 0
    const classes = useStyles();


    const onCloseDialog = () => setOpenDialog(false)

    const show_initDialog = (mode, id) => {
        let title = null;
        const task = tasks.find(each => each.id == id);


        setDialogDataByMode(mode)
        setOpenDialog(true);
        setSelectTask(task);
    }
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

    const handleOnSaveTask = () => {

    }
    const handleOnDoneTask = () => {

    }
    const handleOnEditMode = () => {
        setDialogDataByMode(EDIT)
    }
    const handleOnDeleteTask = () => {

    }
    return (
        <Container>

            {isempty &&

                <Button color='primary' variant="contained" onClick={show_initDialog.bind(this, ADD)}>Add first task ;)</Button>
            }

            {!isempty &&
                <Box>

                    <List className={classes.taskZone}>

                        {tasks.map((each, index) =>
                            <>
                                <TaskCard {...each} key={index}
                                    onEditTask={show_initDialog.bind(this, VIEW, each.id)}
                                    onDoneTask={show_initDialog.bind(this, ARCHIVE, each.id)}
                                />

                                {(index < tasks.length - 1) && <Divider variant="inset" component="li" />}
                            </>
                        )}

                    </List>

                    <Fab color="primary"
                        className={classes.fabFixPosition}
                        onClick={show_initDialog.bind(this, ADD, null)}>
                        <Add />
                    </Fab>

                </Box>
            }

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


const useStyles = makeStyles((theme) => ({
    fabFixPosition: {
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
    },
    taskZone: {
        borderRadius: '1rem',
        margin: '5rem',
        backgroundColor: '#ffff',
    },
}));

function DialogContentDaynamic({ mode, ...props }) {
    switch (mode) {
        case ADD:
        case VIEW:
        case EDIT:
            return <TaskForm {...props} mode={mode} />

        case ARCHIVE:
            return <h1>{ARCHIVE}</h1>

        default:
            return null
    }
}