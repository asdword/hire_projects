import { Box, Button, Divider, Fab, List, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import { ADD, VIEW } from '../constant'
import TaskCard from './TaskCard'
import PT from 'prop-types'


function TaskList({ activeTasks, onOpenTask, onArchiveTask ,onOpenArchiveTasks}) {

    const classes = useStyles();
    const isempty = activeTasks.length === 0;

    return (
        <>
            {isempty &&
                <Typography variant="div" style={{ textAlign: 'center' }}>
                    <Button color='primary' variant="contained" onClick={onOpenTask.bind(this, ADD)}>Add first task ;)</Button>
                </Typography>
            }

            {!isempty &&
                <Box>
                    <Button color='primary' variant="contained" onClick={onOpenArchiveTasks}>View done tasks</Button>

                    <List className={classes.taskZone}>

                        {activeTasks.map((each, index) =>
                            <>
                                <TaskCard {...each} key={index}
                                    onEditTask={onOpenTask.bind(this, VIEW, each.id)}
                                    onDoneTask={onArchiveTask.bind(this, each.id)}
                                />

                                {(index < activeTasks.length - 1) && <Divider variant="inset" component="li" />}
                            </>
                        )}

                    </List>

                    <Fab color="primary"
                        className={classes.fabFixPosition}
                        onClick={onOpenTask.bind(this, ADD, null)}>
                        <Add />
                    </Fab>

                </Box>
            }
        </>
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

TaskList.propTypes = {
    activeTasks: PT.array.isRequired,
    onOpenTask: PT.func.isRequired,
    onArchiveTask : PT.func,
    onOpenArchiveTasks: PT.func
}
TaskList.defaultProps = {
    activeTasks: [],
}

export default TaskList
