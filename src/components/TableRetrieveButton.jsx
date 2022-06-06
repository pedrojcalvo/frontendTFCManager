import React from 'react';
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import {NavLink} from 'react-router-dom';

const TableRetrieveButton = ({id, section}) => {
  return ( 
    <Button variant="text" startIcon={<GetAppIcon color="primary"/>}component={NavLink} to={`/menu/${section}/${id}/retrieve`}></Button>
  )
}

export default TableRetrieveButton;
