import React, {useEffect, useState} from "react";
import ListTile from './ListTile';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SendIcon from '@material-ui/icons/Send';
import data from './../data';
import axios from 'axios';


// axios.get('https://api.github.com/users')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// // Optionally the request above could also be done as
// axios.get('https://api.github.com/users', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
const url="http://localhost:5000/lists";

export default function ListsListing() {
    const [lists, setLists] = useState([]);

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function getLists() {
        try {
            const response = await axios.get(url,);
            // setLists(['lorem','ipsmu']);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLists().then(r => {
            setLists(r.data);
        });
    },[]);
    let fake_data = [];

    return (
        <>
            <div style={{margin: 10}}>
                <form action="/" style={{display: 'flex', flexDirection: 'row'}}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Add new list</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            labelWidth={82}
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