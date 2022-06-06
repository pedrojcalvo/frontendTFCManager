import React from 'react';
import { Button } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';


const CreateButtonDisabled = () => {

 

  return (
    
    <div className='float-md-end'>
       <Button variant="text" startIcon={<CreateNewFolderIcon color="disabled"/>} disabled={true}>Nuevo </Button>
    </div>
  )
}

export default CreateButtonDisabled;
