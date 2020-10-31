import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const qs = require('querystring');

export default function TaskTile({taskItemData,listId}) {
    let [taskData, setTaskData] = useState(taskItemData);
    // let {_id: taskId, name, isDone} = taskData;

    const handleChange = (event) => {
        setTaskData((previous) => {
            return {...previous, isDone: event.target.checked};
        });
    };

    const handleClick = (event) => {
        setTaskData((previous) => {
            return {...previous, isDone: !taskData.isDone};
        });
    };
    useEffect(() => {
        console.log('updateTaskData');
        updateTaskData();
    }, [updateTaskData]);

    function updateTaskData() {
        let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
        const url = baseUrl + '/tasks/'+taskData._id;
        const requestBody = {
            ...taskData,listId
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        axios.post(url, qs.stringify(requestBody), config)
            .then((r) => {
                // console.log(r);
                //fetchData();
            }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <Grid item xs={12}>
            <Grid container style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                    checked={taskData.isDone}
                    color="primary"
                    size="small"
                    onChange={handleChange}
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
                <span style={{textDecoration: taskData.isDone ? 'line-through' : 'none'}}
                      onClick={handleClick}>{taskData.name}</span>
            </Grid>
        </Grid>
    );
}