import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Card from '@material-ui/core/Card';
import Paper from "@material-ui/core/Paper";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function ListTile({listItemData}) {
    let {_id: itemId, tasks, name} = listItemData;
    let item_link = 'list/' + itemId;

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Link to={item_link} style={{textDecoration: 'none'}}>
                <Paper elevation={2} style={{borderLeft:"0.3rem solid "+(listItemData.color||"rgb(55, 83, 221)")}}>
                <Card>
                    <CardHeader avatar={
                        <Avatar aria-label="recipe">
                            <AssignmentIcon/>
                        </Avatar>
                    }
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVertIcon/>
                                //     </IconButton>
                                // }
                                title={(name.length > 25) ? (name.substr(0, 25) + '...') : (name)}
                                subheader={(tasks.length > 1) ? (tasks.length + ' tasks') : tasks.length + ' task'}
                    /></Card>
                </Paper>
            </Link>
        </Grid>
    );
}