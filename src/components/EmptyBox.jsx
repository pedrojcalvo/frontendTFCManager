import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import logo from '../images/logoApp.png';
import { width } from '@mui/system';

const EmptyBox = () => {


  return(
    <div>
      <Grid container className='mt-5'>
          <Grid item xs={12} sm={12} md={12} xl={12}>
                <img className='ms-5' src={logo} style={{width:"80%"}} />
          </Grid>
      </Grid>
    </div>
  )
};

export default EmptyBox;