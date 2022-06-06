import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { retrieveCustomer, getInactiveCustomersById } from '../services/customer.services';
import { useEffect, useState } from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';

export default function CustomersRetrieveModal() {
    const { id } = useParams();

    const [customer, setCustomer] = useState([]);

    useEffect( () =>{
        const getCustomer = async(id) => {
            setCustomer(await getInactiveCustomersById(id));
        }
        getCustomer(id);
    }, []);

    const customerLogicalRetrieve = (event) => {
        retrieveCustomer(id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Recuperación de Cliente
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El cliente {customer.customer_name}  será recuperado en la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/inactives/customers`} onClick={customerLogicalRetrieve} ><GetAppIcon/> Recuperar</Button>
                    <Button component={NavLink} to={`/menu/inactives/customers`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}