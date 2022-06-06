
import { Grid } from '@material-ui/core';
import ProjectsTable from './ProjectsTable';
import CreateButton from './CreateButton';
import { getUserData } from '../services/login.services';
import CreateButtonDisabled from './CreateButtonDisabled';
import Typography from '@mui/material/Typography';

const ProjectsBox = () => {

  const userLogged = getUserData();

  return(
    <div>
      <Grid container className='mt-5'>
          <Grid item xs={12} sm={12} md={12} xl={12}>
          <Typography variant="h4">Listado de Proyectos</Typography>
            {
              userLogged.role === 1 ? (<CreateButton section='projects/project'/>) : 
              (<CreateButtonDisabled />) 
            }
            <ProjectsTable />
          </Grid>
      </Grid>
    </div>
  )
};

export default ProjectsBox;
