
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import ListIcon from  '@material-ui/icons/List';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {NavLink} from 'react-router-dom';
import { getUserData } from '../services/login.services';

const ProjectSubMenu = () => {
  const userLogged = getUserData()

  return(
    <div>
      <Grid container className='mt-5'>
        <Grid item xs={12} sm={12} md={12} xl={12}>
        { userLogged.role === 1 ? (
          <Button
            fullWidth variant="outlined" size="large" startIcon={<ListIcon />}
            style={{ textTransform: "none", padding: "50px 50px" }}
            component={NavLink} to={"/menu/projects/projectlist"}>
              Gestión de Proyectos 
          </Button>) :
          (
            <Button
              fullWidth variant="outlined" size="large" startIcon={<ListIcon color="disabled" />}
              style={{ textTransform: "none", padding: "50px 50px" }} disabled={true}>
                Gestión de Proyectos 
            </Button>
          )
        }
          <Button className='mt-5'
            fullWidth variant="outlined" size="large" startIcon={<HomeWorkIcon />}
            style={{ textTransform: "none", padding: "50px 50px" }}
            component={NavLink} to={"/menu/projects/workorderlist"}>
              Gestión de Partes de Trabajo 
          </Button>
        </Grid>
      </Grid>
    </div>
  )
};

export default ProjectSubMenu;
