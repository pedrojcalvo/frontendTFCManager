import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { deleteUsers, getUserById } from '../services/user.services';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function UsersDeleteModal() {
    const { id } = useParams();

    const [user, setUser] = useState([]);

    useEffect( () =>{
        const getUser = async(id) => {
            setUser(await getUserById(id));
        }
        getUser(id);
    }, []);

    const userLogicalDelete = (event) => {
        deleteUsers(user.user_id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Borrado de Empleados
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El empleado {user.user_name} será borrado de la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/users`} onClick={userLogicalDelete} ><DeleteForeverIcon/> Borrar</Button>
                    <Button component={NavLink} to={`/menu/users`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}