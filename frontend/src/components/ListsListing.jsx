import React from "react";
import ListTile from './ListTile';
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SendIcon from '@material-ui/icons/Send';


import data from './../data';
export default function ListsListing() {
    return (
        <>
            <div style={{margin: 10}}>
                <form action="/" style={{display:'flex',flexDirection:'row'}}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">Add new list</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            labelWidth={60}
                        />
                    </FormControl>
                    <button type={"submit"}><SendIcon/></button>
                </form>

                <Grid container spacing={1} style={{marginTop: 10}}>
                    {data.map((item) => {

                        return <ListTile key={item.id} listItemData={item}/>;
                    })}
                </Grid>
            </div>
        </>
    );
}