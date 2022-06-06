import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { deleteMaterials, getMaterialsById } from '../services/material.services';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function MaterialsDeleteModal() {
    const { id } = useParams();

    const [material, setMaterial] = useState([]);

    useEffect( () =>{
        const getMaterial = async(id) => {
            setMaterial(await getMaterialsById(id));
        }
        getMaterial(id);
    }, []);

    const materialLogicalDelete = (event) => {
        deleteMaterials(material.material_id);
    }

    return (
        <div class="position-absolute top-50 start-50 translate-middle">
            <Card sx={{ minWidth: 275, maxWidth:500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Borrado de Productos
                    </Typography>
                    <Typography variant="bold" sx={{ mt: 2, mb: 2 }} color="text.secondary">
                        El producto con la referencia {material.material_reference} será borrado de la base de datos.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={NavLink} to={`/menu/materials`} onClick={materialLogicalDelete} ><DeleteForeverIcon/> Borrar</Button>
                    <Button component={NavLink} to={`/menu/materials`}> Cancelar </Button>
                </CardActions>
            </Card>
        </div>
        )
}