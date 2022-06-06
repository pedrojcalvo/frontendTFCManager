
import React from 'react';
import { Divider, Drawer, makeStyles } from '@material-ui/core';
import Lists from './Lists';

const styles = makeStyles(theme => ({
    drawer: {
        width: 150,
        flexShrink: 0,
    },
    drawerPaper:{
        width: 240,
    },
    toolbar: theme.mixins.toolbar,
}));

const Drawercomp = (props) => {

    const classes = styles();

    return(
        <div>
            <Drawer
                className={classes.drawer} 
                classes={{paper: classes.drawerPaper}} 
                anchor='left' 
                variant={props.variant} 
                open={props.open}
                onClose={props.onClose ? props.onClose : null}
            >
                <div className={classes.toolbar}></div>
                <Divider />
                <Lists />
            </Drawer>
        </div>
    )
}

export default Drawercomp;
