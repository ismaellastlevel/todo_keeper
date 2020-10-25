import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from "@material-ui/core/Paper";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import MenuDropper from './utils/MenuDropper';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from '@material-ui/core/IconButton';
import Input from "@material-ui/core/Input";
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import TaskTile from './TaskTile';

const qs = require('querystring');


export default function ListCard({data}) {
    let {_id: id, name} = data;

    let [tasks, setTasks] = useState(data.tasks);

    let [taskInputValue, setTaskInputValue] = useState('');
    let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
    const url = baseUrl + '/tasks';

    function handleFormSubmit(e) {
        e.preventDefault();
        const requestBody = {
            name: taskInputValue,
            listId: id,
            isDone:false
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        axios.post(url, qs.stringify(requestBody), config)
            .then((r) => {
                console.log(r);
                setTaskInputValue('');
                setTasks((previous) => {
                    return [...previous, r.data.newTask];
                })
            }).catch((e) => {
            console.log(e);
        });
    }

    function handleChange(e) {
        setTaskInputValue(e.target.value);
    }

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            justify="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item xs={12} md={6} lg={3}>
                <Paper elevation={5}>
                    <Card>
                        <CardHeader title={name} action={<MenuDropper/>}/>
                        <CardContent>
                            {(tasks.length <= 0) ? ('no task') : (tasks.map((item) => (
                                <TaskTile key={item._id} listId={id} taskItemData={item}/>)))}
                            <br/>
                            <form action="/" style={{display: 'flex', flexDirection: 'row'}}
                                  onSubmit={handleFormSubmit}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">add new task</InputLabel>
                                    <Input
                                        id="outlined-adornment-amount"
                                        onChange={handleChange}
                                        value={taskInputValue}
                                    />
                                </FormControl>

                                <IconButton style={{backgroundColor:"#3F51B5"}} type={"submit"}><SendIcon style={{color: "white"}}/></IconButton>
                            </form>
                        </CardContent>

                    </Card>
                </Paper>
            </Grid>
        </Grid>
    );
}