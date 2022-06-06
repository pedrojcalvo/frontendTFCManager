import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { retrieveProjects, getInactiveProjectById } from '../services/project.services';
import { useEffect, useState } from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';

export default function ProjectsDeleteModal() {
    const { id } = useParams();
    console.log(id);

    const [project, setProject] = useState([]);

    useEffect( () =>{
        const getProject = async(id) => {
            setProject(await getInactiveProjectById(id));
        }
        getProject(id);
    }, []);

    console.log(project);

    const projectLogicalRetrieve = (event) => {
        retrieveProjects(project.project_id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Recuperación de Proyectos
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El proyecto {project.project_name}, con id de projecto {project.project_id}, será recuperado de la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/inactives/projects`} onClick={projectLogicalRetrieve} ><GetAppIcon/> Recuperar</Button>
                    <Button component={NavLink} to={`/menu/inactives/projects`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}