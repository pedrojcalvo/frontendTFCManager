
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import UsersTable from './UsersTable';
import CreateButton from './CreateButton';
import UsersFormModal from './UsersFormModal';
import { getUserData } from '../services/login.services';
import CreateButtonDisabled from './CreateButtonDisabled';
import Typography from '@mui/material/Typography';

const UserBox = () => {

  const userLogged = getUserData();

  return(
    <div>
        <Grid container className='mt-5'>
          <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h4">Listado de Empleados</Typography>
            {
              userLogged.role === 1 ? (<CreateButton section='users'/>) : 
              (<CreateButtonDisabled />) 
            }
            <UsersTable />
          </Grid>
       </Grid>
    </div>
  )
};

export default UserBox;
