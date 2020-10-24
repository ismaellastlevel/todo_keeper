import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from "react-router-dom";

export default function NavBar() {

    return (
        <>
            <AppBar position="static" style={{marginBottom:15}}>
                <Toolbar>
                    <Link style={{textDecoration:"none",color:"white", textTransform:"uppercase"}} to={'/'}>{"Todo keeper"}</Link>
                </Toolbar>
            </AppBar>
        </>
    );
}