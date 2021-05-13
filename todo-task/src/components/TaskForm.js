import React from 'react'
import { Box, Button, FormControlLabel, makeStyles, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { VIEW, EDIT } from '../constant';


export default function TaskForm({ mode, ...props }) {
    return mode === VIEW ?
        <TaskForm_ViewMode {...props} />
        :
        <TaskForm_EditMode {...props} />
}


function TaskForm_ViewMode({ id, title, decs, status, onDeleteTask, onDoneTask, onEditMode }) {
    const classes = useStyles();

    return (
        <Box>
            <Typography variant="h6" className={classes.textCenter}>
                {title}
            </Typography>

            <Typography variant="p">
                {decs}
            </Typography>

            <Box className={classes.footerButtonZone}>

                <Button variant="contained" color="secondary" onClick={onDeleteTask}>
                    Delete Task
                </Button>
                <Button variant="contained" color="default" onClick={onDoneTask}>
                    Done Task
                </Button>
                <Button variant="contained" color="primary" onClick={onEditMode}>
                    Edit Task
                </Button>
            </Box>
        </Box>
    )
}

function TaskForm_EditMode({ onSaveTask, ...props }) {
    const classes = useStyles();
    const [formData, setFormData] = React.useState(props)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...setFormData, [name]: value })
    }

    const handleOnSaveTask = (e) => {
        onSaveTask(formData)
    }

    return (
        <Box>
            <TextField
                fullWidth
                className={classes.m8}
                label="Task Title"
                variant="outlined"
                name='title'
                value={formData?.title} />

            <TextField
                fullWidth
                value={formData?.decs}
                name='decs'
                className={classes.m8}
                label="Task description"
                multiline
                rows={4}
                variant="outlined"
            />

            <RadioGroup
                name="status"
                value={formData?.status}
                onChange={handleChange}
                className={classes.taskStatusZone}>

                <FormControlLabel value="high" control={<Radio />} label="High" />
                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="low" control={<Radio />} label="Low" />

            </RadioGroup>
            <Box className={classes.footerButtonZone}>
                <Button
                    onClick={handleOnSaveTask}
                    color='primary'
                    variant="contained"
                    size='large'
                    fullWidth
                    className={classes.m8}>
                    Save task to tasks
                </Button>
            </Box>
        </Box>
    )
}



const useStyles = makeStyles((theme) => ({
    m8: {
        margin: 8
    },
    taskStatusZone: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textCenter: {
        textAlign: 'center'
    },
    footerButtonZone: {
        marginTop: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
    }
}))