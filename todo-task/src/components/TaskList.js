import { Box, Button, Container, Divider, Fab, List, makeStyles } from '@material-ui/core'
import React from 'react'
import { TasksContext } from '../context/tasks/TasksState'
import { Add } from '@material-ui/icons';
import TaskCard from './TaskCard';
import FormDialog from './FormDialog';
import TaskForm from './TaskForm';

const ADD = 'ADD'
const EDIT = 'EDIT'
const ARCHIVE = 'ARCHIVE'

export default function TaskList() {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectTask, setSelectTask] = React.useState()
    const [formType, setFormType] = React.useState()
    const [contentDialog, setContentDialog] = React.useState(null)
    const { tasks } = React.useContext(TasksContext)
    const isempty = tasks.length === 0
    const classes = useStyles();


    const onCloseDialog = () => setOpenDialog(false)

    const showDialog = (type, id) => {
        console.log(type,id);
        const task = tasks.find(each => each.id == id);
        setOpenDialog(true);
        setFormType(type);
        setSelectTask({ ...task, title: task?.title || 'Create new task' });
    }

    const renderContentDialog = () => {
        switch (formType) {
            case ADD:

                return <TaskForm />
            case EDIT:

                return <h1>{EDIT}</h1>
            case ARCHIVE:

                return <h1>{ARCHIVE}</h1>

            default:
                return null
        }
    }

    return (
        <Container>

            {isempty &&

                <Button color='primary' variant="contained" onClick={showDialog.bind(this,ADD)}>Add first task ;)</Button>
            }

            {!isempty &&
                <Box>

                    <List className={classes.taskZone}>

                        {tasks.map((each, index) =>
                            <>
                                <TaskCard {...each} key={index}
                                    onEditTask={showDialog.bind(this,EDIT, each.id)}
                                    onDoneTask={showDialog.bind(this,each.id)}
                                />

                                {(index < tasks.length - 1) && <Divider variant="inset" component="li" />}
                            </>
                        )}

                    </List>

                    <Fab color="primary"
                        className={classes.fabFixPosition}
                        onClick={showDialog.bind(this,ADD)}>
                        <Add />
                    </Fab>

                </Box>
            }

            <FormDialog open={openDialog} title={selectTask?.title} handleClose={onCloseDialog}>
                {renderContentDialog()}
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