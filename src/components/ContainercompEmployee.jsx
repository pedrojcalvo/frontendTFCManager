
import React from 'react';
import {makeStyles, Hidden} from '@material-ui/core';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './Navbar';
import Drawercomp from './Drawercomp';
import ProjectSubMenu from './ProjectSubMenu';
import WorkordersBox from './WorkordersBox';
import { getUserData } from '../services/login.services';
import WorkordersEditForm from './WorkordersEditForm';
import WorkordersFormModal from './WorkordersFormModal';
import WorkordersDetailsView from './WorkordersDetailsView';

const styles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));

const ContainercompEmployee = () => {

    const classes = styles();
    const [deployDrawer, setDeployDrawer] = React.useState(false);
    const openDrawer = () => {
        setDeployDrawer(!deployDrawer);
    };

    const jwtToken = getUserData();
    const userLogged = getUserData();

    return  (jwtToken && userLogged.role===2 ?
            <div className={classes.root}>
                <Navbar openDrawer={openDrawer}/>
                <Hidden xsDown>
                    <Drawercomp variant='permanent' open={true}/>
                </Hidden>
                <Hidden smUp>
                    <Drawercomp variant='temporary' open={deployDrawer} onClose={openDrawer}/>
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Routes>

                        <Route path="/projects" element={<ProjectSubMenu  />}/>
                        <Route path="/projects/workorderlist" element={<WorkordersBox /> }/>
                        <Route path="/projects/workorder/:id/edit" element={<WorkordersEditForm /> }/>
                        <Route path="/projects/workorders/:id/details" element={<WorkordersDetailsView /> }/>
                        <Route path="/projects/workorder/create" element={<WorkordersFormModal /> }/>
                        
                    </Routes>
                </div>
            </div> : <Navigate to={{pathname: '/'}} replace={true}/>)
    
}

export default ContainercompEmployee;
