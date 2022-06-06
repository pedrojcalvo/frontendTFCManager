
import React from 'react';
import {makeStyles, Hidden} from '@material-ui/core';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './Navbar';
import Drawercomp from './Drawercomp';
import CustomersBox from './CustomersBox';
import UsersBox from './UsersBox';
import MaterialsBox from './MaterialsBox';
import ProjectSubMenu from './ProjectSubMenu';
import ProjectsBox from './ProjectsBox';
import WorkordersBox from './WorkordersBox';
import ProjectsDetailsView from './ProjectsDetailsView';
import CustomersDetailsView from './CustomersDetailsView';
import UsersDetailsView from './UsersDetailsView';
import CustomersDeleteModal from './CustomersDeleteModal';
import CustomersRetrieveModal from './CustomersRetrieveModal';
import MaterialsDeleteModal from './MaterialsDeleteModal';
import MaterialsRetrieveModal from './MaterialsRetrieveModal';
import UsersDeleteModal from './UsersDeleteModal';
import UsersRetrieveModal from './UsersRetrieveModal';
import ProjectsDeleteModal from './ProjectsDeleteModal';
import ProjectsRetrieveModal from './ProjectsRetrieveModal';
import WorkordersDeleteModal from './WorkordersDeleteModal';
import WorkordersRetrieveModal from './WorkordersRetrieveModal';
import { getUserData } from '../services/login.services';
import CustomersEditForm from './CustomersEditForm';
import CustomersFormModal from './CustomersFormModal';
import MaterialsEditForm from './MaterialsEditForm';
import UsersEditForm from './UsersEditForm';
import ProjectsEditForm from './ProjectsEditForm';
import WorkordersEditForm from './WorkordersEditForm';
import UsersFormModal from './UsersFormModal';
import MaterialsFormModal from './MaterialsFormModal';
import ProjectsFormModal from './ProjectsFormModal';
import WorkordersFormModal from './WorkordersFormModal';
import WorkordersDetailsView from './WorkordersDetailsView';
import InactivesBox from './InactivesBox';
import InactivesCustomersTable from './InactivesCustomersTable';
import InactivesUsersTable from './InactivesUsersTable';
import InactivesProjectsTable from './InactivesProjectsTable';
import InactivesWorkordersTable from './InactivesWorkordersTable';
import InactivesMaterialsTable from './InactivesMaterialsTable';
import ContainercompEmployee from './ContainercompEmployee';
import EmptyBox from './EmptyBox';

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

const Containercomp = () => {

    const classes = styles();
    const [deployDrawer, setDeployDrawer] = React.useState(false);
    const openDrawer = () => {
        setDeployDrawer(!deployDrawer);
    };

    const jwtToken = getUserData();
    const userLogged = getUserData();

    return  (jwtToken && userLogged.role===1 ?
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
                        <Route path="/" element={<EmptyBox />}/>
                        <Route path="/customers" element={<CustomersBox />}/>
                        <Route path="/customers/:id/details" element={<CustomersDetailsView /> }/>
                        <Route path="/customers/:id/edit" element={<CustomersEditForm /> }/>
                        <Route path="/customers/:id/delete" element={<CustomersDeleteModal /> }/>
                        <Route path="/customers/:id/retrieve" element={<CustomersRetrieveModal /> }/>
                        <Route path="/customers/create" element={<CustomersFormModal /> }/>

                        <Route path="/users" element={<UsersBox />}/>
                        <Route path="/users/:id/details" element={<UsersDetailsView /> }/> 
                        <Route path="/users/:id/edit" element={<UsersEditForm /> }/>
                        <Route path="/users/:id/delete" element={<UsersDeleteModal /> }/>
                        <Route path="/users/:id/retrieve" element={<UsersRetrieveModal /> }/>
                        <Route path="/users/create" element={<UsersFormModal /> }/>

                        <Route path="/materials" element={<MaterialsBox />}/>
                        <Route path="/materials/:id/edit" element={<MaterialsEditForm /> }/>
                        <Route path="/materials/:id/delete" element={<MaterialsDeleteModal /> }/>
                        <Route path="/materials/:id/retrieve" element={<MaterialsRetrieveModal /> }/>
                        <Route path="/materials/create" element={<MaterialsFormModal /> }/>

                        <Route path="/projects/projectlist" element={<ProjectsBox /> }/>
                        <Route path="/projects" element={<ProjectSubMenu  />}/>
                        <Route path="/projects/project/:id/delete" element={<ProjectsDeleteModal /> }/>
                        <Route path="/projects/project/:id/retrieve" element={<ProjectsRetrieveModal /> }/>
                        <Route path="/projects/project/:id/edit" element={<ProjectsEditForm /> }/>
                        <Route path="/projects/project/create" element={<ProjectsFormModal /> }/>
                        <Route path="/projects/:id/details" element={<ProjectsDetailsView /> }/>

                        <Route path="/projects/workorder/:id/delete" element={<WorkordersDeleteModal /> }/>
                        <Route path="/projects/workorder/:id/retrieve" element={<WorkordersRetrieveModal /> }/>
                        <Route path="/projects/workorderlist" element={<WorkordersBox /> }/>
                        <Route path="/projects/workorder/:id/edit" element={<WorkordersEditForm /> }/>
                        <Route path="/projects/workorders/:id/details" element={<WorkordersDetailsView /> }/>
                        <Route path="/projects/workorder/create" element={<WorkordersFormModal /> }/>

                        <Route path="/inactives" element={<InactivesBox />}/>
                        <Route path="/inactives/customers" element={<InactivesCustomersTable />}/>
                        <Route path="/inactives/users" element={<InactivesUsersTable />}/>
                        <Route path="/inactives/projects" element={<InactivesProjectsTable />}/>
                        <Route path="/inactives/workorders" element={<InactivesWorkordersTable />}/>
                        <Route path="/inactives/materials" element={<InactivesMaterialsTable />}/>  
                    </Routes>
                </div>
            </div> : <ContainercompEmployee />)
    
}

export default Containercomp;
