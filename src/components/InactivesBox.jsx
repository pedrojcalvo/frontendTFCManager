
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import DescriptionIcon from '@material-ui/icons/Description';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import {NavLink} from 'react-router-dom';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';;

const CustomerBox = () => {

  return(

    <div>
      <Grid container className='mt-5'>
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Button
            fullWidth variant="outlined" size="large" startIcon={<AssignmentIndIcon />}
            style={{ textTransform: "none", padding: "50px 50px" }}
            component={NavLink} to={"/menu/inactives/customers"}>
              Clientes Inactivos 
          </Button>

          <Button className='mt-3'
            fullWidth variant="outlined" size="large" startIcon={<AccessibilityNewIcon />}
            style={{ textTransform: "none", padding: "50px 50px" }}
            component={NavLink} to={"/menu/inactives/users"}>
              Empleados Inactivos 
          </Button>

          <Button className='mt-3'
            fullWidth variant="outlined" size="large" startIcon={<DescriptionIcon />}
            style={{ textTransform: "none", padding: "50px 50px" }}
            component={NavLink} to={"/menu/inactives/projects"}>
              Proyectos Inactivos 
          </Button>

          <Button className='mt-3'
            fullWidth variant="outlined" size="large" startIcon={<HomeWorkIcon />}
            style={{ textTransform: "none", padding: "50px 50px" }}
            component={NavLink} to={"/menu/inactives/workorders"}>
              Partes de Trabajo Inactivos 
          </Button>

          <Button className='mt-3'
            fullWidth variant="outlined" size="large" startIcon={<AllInboxIcon />}
            style={{ textTransform: "none", padding: "50px 50px" }}
            component={NavLink} to={"/menu/inactives/materials"}>
             Materiales Inactivos 
          </Button>
        </Grid>
      </Grid>
    </div>
  )
};

export default CustomerBox;
