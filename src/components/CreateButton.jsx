import React from 'react';
import { Button } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {NavLink} from 'react-router-dom';

const CreateButton = ({object, section}) => {

  return (
    
    <div className='float-md-end'>
      <Button variant="text" startIcon={<CreateNewFolderIcon color="primary"/>}component={NavLink} to={`/menu/${section}/create`}>Nuevo </Button>
    </div>
  )
}

export default CreateButton;
