import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { retrieveWorkorders, getInactiveWorkorderById } from '../services/workorder.services';
import { useEffect, useState } from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';

export default function WorkordersDeleteModal() {
    const { id } = useParams();

    const [workorder, setWorkorder] = useState([]);

    useEffect( () =>{
        const getWorkorder = async(id) => {
            setWorkorder(await getInactiveWorkorderById(id));
        }
        getWorkorder(id);
    }, []);

    console.log(workorder.workorder_id, workorder.user_name);

    const workorderLogicalRetrieve = (event) => {
        retrieveWorkorders(workorder.workorder_id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Recuperación de Partes de Trabajo
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El parte de trabajo con id {workorder.workorder_id},creado por {workorder.user_name}, perteneciente al proyecto {workorder.project_name}, será recuperado en la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/inactives/workorders`} onClick={workorderLogicalRetrieve} ><GetAppIcon/> Recuperar</Button>
                    <Button component={NavLink} to={`/menu/inactives/workorders`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}