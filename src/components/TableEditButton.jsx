import React from 'react';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {NavLink} from 'react-router-dom';

const TableEditButton = ({id, section}) => {
  return (
    <Button variant="text" startIcon={<CreateIcon color="secondary"/>} component={NavLink} to={`/menu/${section}/${id}/edit`}></Button>
  )
}

export default TableEditButton;
