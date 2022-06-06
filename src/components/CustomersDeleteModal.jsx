import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { deleteCustomers, getCustomersById } from '../services/customer.services';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function CustomersDeleteModal() {
    const { id } = useParams();

    const [customer, setCustomer] = useState([]);

    useEffect( () =>{
        const getCustomer = async(id) => {
            setCustomer(await getCustomersById(id));
        }
        getCustomer(id);
    }, []);

    const customerLogicalDelete = (event) => {
        deleteCustomers(customer.customer_id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Borrado de Cliente
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El cliente {customer.customer_name} será borrado de la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/customers`} onClick={customerLogicalDelete} ><DeleteForeverIcon/> Borrar</Button>
                    <Button component={NavLink} to={`/menu/customers`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}