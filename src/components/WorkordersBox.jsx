
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import WorkordersTable from './WorkordersTable';
import CreateButton from './CreateButton';
import Typography from '@mui/material/Typography';

const WorkordersBox = () => {

  return(
    <div>
        <Grid container className='mt-5'>
          <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h4">Listado de Partes de trabajo</Typography>
            <CreateButton section='projects/workorder'/>
            <WorkordersTable />
          </Grid>
       </Grid>
    </div>
  )
};

export default WorkordersBox;
