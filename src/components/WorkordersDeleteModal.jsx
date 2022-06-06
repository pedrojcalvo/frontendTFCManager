import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { deleteWorkorders, getWorkorderById } from '../services/workorder.services';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function WorkordersDeleteModal() {
    const { id } = useParams();
    console.log(id);

    const [workorder, setWorkorder] = useState([]);

    useEffect( () =>{
        const getWorkorder = async(id) => {
            setWorkorder(await getWorkorderById(id));
        }
        getWorkorder(id);
    }, []);

    console.log(workorder);

    const workorderLogicalDelete = (event) => {
        deleteWorkorders(workorder.workorder_id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Borrado de Partes de Trabajo
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El parte de trabajo con id {workorder.workorder_id},creado por {workorder.user_name}, perteneciente al proyecto {workorder.project_name}, será borrado de la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/projects/workorderlist`} onClick={workorderLogicalDelete} ><DeleteForeverIcon/> Borrar</Button>
                    <Button component={NavLink} to={`/menu/projects/workorderlist`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}