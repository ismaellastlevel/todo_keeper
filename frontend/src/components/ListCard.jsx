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
import MenuItem from '@material-ui/core/MenuItem';

import SimpleModal from './to_be_deleted';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from "@material-ui/core/styles";

const qs = require('querystring');


export default function ListCard({data}) {
    let {_id: id} = data;

    let [name, setName] = useState(data.name);
    let [listName, setListName] = useState(name);

    let [tasks, setTasks] = useState(data.tasks);

    let [taskInputValue, setTaskInputValue] = useState('');
    let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
    const url = baseUrl + '/tasks';

    function handleFormSubmit(e) {
        e.preventDefault();
        const requestBody = {
            name: listName,
            listId: id,
            isDone: false
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



    function removeList(e) {
        //todo: trigger modal
    }

    function handleChange(e) {
        setTaskInputValue(e.target.value);
    }



    //modal script
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getModalStyle() {
        const top = 50 ;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

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

    function handleRenameListFormSubmit(e) {
        let updateListUrl=baseUrl+'/lists/'+id;
        e.preventDefault();
        const requestBody = {
            name: listName
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        axios.post(updateListUrl, qs.stringify(requestBody), config)
            .then((r) => {
                console.log(r);
                setListName(r.data.list.name);
                setName(r.data.list.name);
                handleClose();
            }).catch((e) => {
            console.log(e);
        });
    }
    function handleRenameListChange(e) {
        setListName(e.target.value);
    }

    const renameListModalBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Rename list</h2>
            <form action="/" style={{display: 'flex', flexDirection: 'row'}}
                  onSubmit={handleRenameListFormSubmit}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">rename this list</InputLabel>
                    <Input
                        id="outlined-adornment-amount"
                        onChange={handleRenameListChange}
                        value={listName}
                    />
                </FormControl>

                <IconButton style={{backgroundColor: "#3F51B5"}} type={"submit"}><SendIcon
                    style={{color: "white"}}/></IconButton>
            </form>
        </div>
    );

    //modal script

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
                        <CardHeader title={name} action={
                            <MenuDropper>
                                <MenuItem onClick={handleModalOpen}>rename</MenuItem>
                                <MenuItem onClick={handleClose}>delete</MenuItem>
                            </MenuDropper>}/>
                        <CardContent>

                            {/*modals*/}
                            <div>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description"
                                 >
                                    {renameListModalBody}
                                </Modal>
                            </div>

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

                                <IconButton style={{backgroundColor: "#3F51B5"}} type={"submit"}><SendIcon
                                    style={{color: "white"}}/></IconButton>
                            </form>
                        </CardContent>

                    </Card>
                </Paper>
            </Grid>
        </Grid>
    );
}