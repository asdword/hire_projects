import React from 'react'
import { Folder, FiberManualRecordRounded } from '@material-ui/icons'
import { Avatar, Box, Button, ListItem, ListItemAvatar, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import PT from 'prop-types'

function TaskCard({ onEditTask, onDoneTask, title, decs, status }) {
    const classes = useStyles();

    return (
        <ListItem onClick={onEditTask}>
            <ListItemAvatar>
                <Avatar>
                    <Folder />
                </Avatar>
            </ListItemAvatar>


            <ListItemText
                primary={title}
                secondary={decs}
            />

            <ListItemIcon className={classes.cardActionZone}>

                <Box className={classes.statusZone}>
                    {status}
                    <FiberManualRecordRounded />
                </Box>

                <Box className={classes.mt1}>
                    <Button onClick={onDoneTask} size="small" variant="contained" color='default'>
                        Done task
                    </Button>

                    <Button onClick={onEditTask} size="small" variant="contained" color='primary'  className={classes.ml1}>
                        Edit task
                    </Button>
                </Box>
            </ListItemIcon>

        </ListItem>
    )
}


const useStyles = makeStyles((theme) => ({
    cardActionZone: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'end',
    },
    ml1: {
        marginLeft: '1rem',
    },
    mt1: {
        marginTop: '1rem',
    },
    statusZone:{
        display:'flex',
        alignItems:'center'
    }
}));


TaskCard.propTypes={
    onDoneTask:PT.func.isRequired,
    onEditTask:PT.func.isRequired,
}

export default TaskCard