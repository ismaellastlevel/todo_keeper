import React, {useState,useEffect} from "react";
import ListTile from './ListTile';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SendIcon from '@material-ui/icons/Send';

import {useFetchData} from '../hooks/useFetchData';
import axios from 'axios';

const qs = require('querystring');

async function getLists(url) {
    try {
        return await axios.get(url);
    } catch (error) {
        console.error(error);
    }
}

export default function ListsListing() {
    let [lists, setLists] = useState([]);
    let [listInputValue, setListInputValue] = useState('');
    let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
    const url = baseUrl + '/lists';

    function fetchData() {
        getLists(url).then((r) => {
            setLists(r.data);
        });
    }

    useEffect(()=>{
        fetchData();
    },[]);


    function handleFormSubmit(e) {
        e.preventDefault();
        const requestBody = {
            name: listInputValue,
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        axios.post(url, qs.stringify(requestBody), config)
            .then((r) => {
                console.log(r);
                setListInputValue('');
                setLists((previous)=>{
                    return [...previous,r.data.newList];
                })
                //fetchData();
            }).catch((e) => {
            console.log(e);
        });
    }

    function handleChange(e) {
        setListInputValue(e.target.value);
    }

    return (
        <div style={{margin: 10}}>
            <form action="/" style={{display: 'flex', flexDirection: 'row'}} onSubmit={handleFormSubmit}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Add new list</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        labelWidth={82}
                        onChange={handleChange}
                        value={listInputValue}
                    />
                </FormControl>
                <button type={"submit"}><SendIcon/></button>
            </form>

            <Grid container spacing={1} style={{marginTop: 10}}>
                {lists.map(item => <ListTile key={item._id} listItemData={item}/>)}
            </Grid>
        </div>
    );
}