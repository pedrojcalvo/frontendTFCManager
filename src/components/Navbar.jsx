
import React from 'react';
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from 'react-router-dom';
import { closeSession } from '../services/login.services';

const useStyle = makeStyles((theme) =>({
    menuButton:{
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            display: 'none',
        }
    },
    tittle:{
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]:{
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
        }  
    }
}));

const Navbar = (props) => {
    const classes =useStyle()
      return(
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu' className={classes.menuButton} onClick={()=> props.openDrawer()}>
                        <MenuIcon />
                    </IconButton>
                    <Hidden mdDown>
                        <Typography variant='h2' className={classes.tittle}> 
                            Gisbert Bañon Electricidad
                        </Typography>
                    </Hidden>
                    <Hidden lgUp>
                        <Typography variant='h5' className={classes.tittle}> 
                            Gisbert Bañon Electricidad
                        </Typography>
                    </Hidden>

                    <NavLink to="/"  className="me-5" style={({ isActive }) =>
                        isActive
                            ? {
                                color: '##FDFEFE',
                                textDecoration: 'none'
                            }
                            : { color: '#FDFEFE', textDecoration: 'none' }
                        } onClick={closeSession}>SALIR</NavLink>
                
             </Toolbar>
           </AppBar>
        </div>
    )
}

export default Navbar
