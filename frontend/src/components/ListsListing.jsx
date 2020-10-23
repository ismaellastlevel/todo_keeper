import React, {useEffect, useState} from "react";
import ListTile from './ListTile';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SendIcon from '@material-ui/icons/Send';

import {useFetchData} from './../hooks/useFetchData';
import axios from 'axios';

const qs = require('querystring');

export default function ListsListing() {
    let baseUrl = process.env.REACT_APP_TODOKEEPER_API_URL;
    const url = baseUrl + '/lists';
    let lists = useFetchData(url);

    let [listInputValue, setListInputValue] = useState('');

    function handleFormSubmit(e) {
        e.preventDefault();
        //todo: handle errors
        // let bodyFormData = new FormData();
        // bodyFormData.append('name', listInputValue);
        // console.log(url);

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
        }).catch((e) => {
            console.log(e);
        });
        // axios({
        //     method: 'post',
        //     url: url,
        //     data: bodyFormData,
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        // }).then((r) => {
        //     console.log(r);
        // }).catch((e) => {
        //     console.log(e);
        // });
    }

    function handleChange(e) {
        setListInputValue(e.target.value);
    }


    return (
        <>
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
        </>
    );
}