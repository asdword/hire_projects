import React from 'react'
import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core'

export default function TaskForm({ mode, ...props }) {
    return mode === 'view' ?
        <TaskForm_EditMode {...props} />
        :
        <TaskForm_EditMode {...props} />
}


function TaskForm_EditMode({ title, decs, type, mode }) {
    
    const handleChange = (e) => {

    }

    return (
        <Box>
            <TextField
                fullWidth
                style={{ margin: 8 }}
                label="Task Title"
                variant="outlined"
                value={title} />

            <TextField
                fullWidth
                style={{ margin: 8 }}
                label="Task description"
                multiline
                rows={4}
                value={decs}
                variant="outlined"
            />

            <RadioGroup
                name="type"
                value={type}
                onChange={handleChange}
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <FormControlLabel value="high" control={<Radio />} label="High" />
                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="low" control={<Radio />} label="Low" />

            </RadioGroup>

            <Button color='primary' variant="contained" size='large' style={{margin:10}}> Save task</Button>
        </Box>
    )
}
