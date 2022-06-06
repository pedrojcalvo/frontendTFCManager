import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { retrieveMaterials, getInactiveMaterialsById } from '../services/material.services';
import { useEffect, useState } from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';

export default function MaterialsRetrieveModal() {
    const { id } = useParams();

    const [material, setMaterial] = useState([]);

    useEffect( () =>{
        const getMaterial = async(id) => {
            setMaterial(await getInactiveMaterialsById(id));
        }
        getMaterial(id);
    }, []);

    const materialLogicalRetrieve = (event) => {
        retrieveMaterials(material.material_id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                    Recuperación de Productos
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El producto con la referencia {material.material_reference} será borrado de la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/inactives/materials`} onClick={materialLogicalRetrieve} ><GetAppIcon/> Recuperar</Button>
                    <Button component={NavLink} to={`/menu/inactives/materials`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}