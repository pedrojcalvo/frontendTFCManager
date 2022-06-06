import React from 'react';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {NavLink} from 'react-router-dom';

const TableEditButtonDisabled = ({id, section}) => {
  return (
    
    <Button variant="text" startIcon={<CreateIcon color="disabled"/>} component={NavLink} to={`/menu/${section}/${id}/edit`} disabled={true}></Button>

  )
}

export default TableEditButtonDisabled;
