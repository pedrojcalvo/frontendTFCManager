import React from 'react';
import { Button } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {NavLink} from 'react-router-dom';


const AccessDetailsButton = ({section, id}) => {
  return (
    
    <Button variant="text" startIcon={<VisibilityIcon color="primary"/>} component={NavLink} to={`/menu/${section}/${id}/details`}></Button>

  )
}

export default AccessDetailsButton;
