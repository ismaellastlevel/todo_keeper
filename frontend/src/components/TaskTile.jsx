import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

export default function TaskTile({taskItemData}) {
    let {_id: taskId, name,isDone} = taskItemData;

    const [checked, setChecked] = useState(isDone);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleClick = (event) => {
        setChecked((previous)=>{
            return !previous;
        });
    };

    return (
        <Grid item xs={12}>
            <Grid container style={{display: 'flex', flexDirection: 'row',alignItems:'center'}}>
                <Checkbox
                    checked={checked}
                    color="primary"
                    size="small"
                    onChange={handleChange}
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
                <span style={{ textDecoration : checked ? 'line-through' : 'none' }} onClick={handleClick}>{name}</span>
            </Grid>
        </Grid>
    );
}