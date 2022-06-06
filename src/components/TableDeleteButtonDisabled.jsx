import React from 'react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const TableDeleteButtonDisabled = () => {
  return (
    
    <Button variant="text" startIcon={<DeleteIcon color="disabled"/>} disabled={true}></Button>

  )
}

export default TableDeleteButtonDisabled;
