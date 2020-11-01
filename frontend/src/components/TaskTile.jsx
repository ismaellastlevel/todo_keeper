import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import MenuDropper from "./utils/MenuDropper";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Modal from "@material-ui/core/Modal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import {useHistory} from 'react-router-dom';

const qs = require('querystring');

export default function TaskTile({taskItemData, listId}) {
    let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
    let [taskData, setTaskData] = useState(taskItemData);
    // let {_id: taskId, name, isDone} = taskData;
    let [taskName, setTaskName] = useState(taskData.name);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();
    const handleCheckboxChange = (event) => {
        setTaskData((previous) => {
            return {...previous, isDone: event.target.checked};
        });
    };

    function handleRenameTaskChange(e) {
        setTaskName(e.target.value);
    }

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

        const url = baseUrl + '/tasks/' + taskData._id;
        const requestBody = {
            ...taskData, listId
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        axios.post(url, qs.stringify(requestBody), config)
            .then((r) => {
                console.log(r);
                //fetchData();
            }).catch((e) => {
            console.log(e);
        });
    }

    let history = useHistory();
    const reload = () => {
        history.go(0);
    }

    function handleTaskDelete() {
        let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
        const url = baseUrl + '/tasks/' + taskData._id;
        const data = qs.stringify({
            'listId': listId
        });
        const config = {
            method: 'delete',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                reload();
                //return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    function handleRenameTaskFormSubmit(e) {
        let updateTaskUrl = baseUrl + '/tasks/' + taskData._id;
        e.preventDefault();
        const requestBody = {
            ...taskData, listId, name: taskName
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        axios.post(updateTaskUrl, qs.stringify(requestBody), config)
            .then((r) => {
                console.log(r);

                setTaskData((prev => {
                    return {...prev, name: r.data.task.name}
                }));
                // setName(r.data.list.name);
                handleClose();
            }).catch((e) => {
            console.log(e);
        });
    }

    function getModalStyle() {
        const top = 50;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }


    const renameTaskModalBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">edit task</h2>
            <form action="/"
                  onSubmit={handleRenameTaskFormSubmit}>
                <Grid container style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Checkbox
                        checked={taskData.isDone}
                        color="primary"
                        size="small"
                        onChange={handleCheckboxChange}
                        inputProps={{'aria-label': 'secondary checkbox'}}
                    />
                    <span style={{textDecoration: taskData.isDone ? 'line-through' : 'none'}}
                          onClick={handleClick}>{taskData.name}</span>
                </Grid>

                <div style={{display: 'flex', flexDirection: 'row', marginTop: "5px"}}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">rename this task</InputLabel>
                        <Input
                            id="outlined-adornment-amount"
                            onChange={handleRenameTaskChange}
                            value={taskName}
                        />
                    </FormControl>

                    <IconButton style={{backgroundColor: "#3F51B5"}} type={"submit"}>
                        <SendIcon
                            style={{color: "white"}}/></IconButton>
                </div>

            </form>
        </div>
    );

//modal script
    function handleChange(e) {

    }


    const handleTaskModalOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Grid item xs={12}>
            <Grid container direction="row"
  justify="space-between"
  alignItems="center" >
                <Checkbox
                    checked={taskData.isDone}
                    color="primary"
                    size="small"
                    onChange={handleCheckboxChange}
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
                <span style={{textDecoration: taskData.isDone ? 'line-through' : 'none'}}
                      onClick={handleClick}>{taskData.name}</span>
                <MenuDropper>
                    <MenuItem onClick={handleTaskModalOpen}>edit</MenuItem>
                    <MenuItem onClick={() => {
                        if (window.confirm('are you sure about that?')) {
                            handleTaskDelete()
                        }
                    }}>delete</MenuItem>
                </MenuDropper>

            </Grid>
            {/*modals*/}
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {renameTaskModalBody}
                    </Modal>
                </div>
        </Grid>

    );
}