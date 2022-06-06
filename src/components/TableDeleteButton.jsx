import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {NavLink} from 'react-router-dom';

const TableDeleteButton = ({id, section}) => {
  return ( 
    <Button variant="text" startIcon={<DeleteIcon color="error"/>}component={NavLink} to={`/menu/${section}/${id}/delete`}></Button>
  )
}

export default TableDeleteButton;
