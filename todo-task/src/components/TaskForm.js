import React from 'react'
import { Box, Button, FormControlLabel, makeStyles, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { VIEW, EDIT } from '../constant';
import { FiberManualRecordRounded } from '@material-ui/icons';


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
            <Typography variant="h6" className={classes.taskHeader}>
                {title}
                <Box className={classes.statusZone}>
                    {status}
                    <FiberManualRecordRounded />
                </Box>
            </Typography>

            <Typography variant="p">
                {decs}
            </Typography>

            <Box className={classes.footerButtonZone}>

                <Button variant="contained" color="secondary" onClick={onDeleteTask.bind(this,id)}>
                    Delete Task
                </Button>
                <Button variant="contained" color="default" onClick={onDoneTask.bind(this,id)}>
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
        console.log(name, value);
        setFormData({ ...formData, [name]: value })
    }

    const handleOnSaveTask = (e) =>
        onSaveTask(formData)


    return (
        <Box>
            <TextField
                fullWidth
                placeholder="task title ..."
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                className={classes.m8}
                label="Task Title"
                variant="outlined"
                name='title'
                onChange={handleChange}
                value={formData?.title} />

            <TextField
                fullWidth
                placeholder="task description ..."
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                value={formData?.decs}
                name='decs'
                className={classes.m8}
                label="Task description"
                multiline
                rows={4}
                onChange={handleChange}
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
    statusZone: {
        position: 'absolute',
        top: 0,
        display: 'flex',
        alignItems: 'center',
    },
    taskStatusZone: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    taskHeader: {
        textAlign: 'center',
        position: 'relative',
        marginBottom: 10,
    },
    footerButtonZone: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
    }
}))