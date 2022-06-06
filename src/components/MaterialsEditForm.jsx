
import { Button, TextField, Select, MenuItem, InputLabel, TextareaAutosize } from "@material-ui/core"; 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateMaterials } from "../services/material.services";
import { getMaterialsById } from "../services/material.services";
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import { Paper } from "@mui/material";

const MaterialsEditForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect( () =>{
        const getMaterial = async(id) => {
          const material = await getMaterialsById(id);
          setMaterial_reference(material.material_reference);
          setMaterial_brand(material.material_brand);
          setMaterial_description(material.material_description);
          setMaterial_pvp(material.material_pvp);
          setMaterial_ecotax(material.material_ecotax);
        }

        getMaterial(id);
    }, []);


    const [material_reference, setMaterial_reference] = useState('');
    const [material_brand, setMaterial_brand] = useState('');
    const [material_description, setMaterial_description] = useState('');
    const [material_pvp, setMaterial_pvp] = useState('');
    const [material_ecotax, setMaterial_ecotax] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setMaterial_ecotax(event.target.value);
    };

    const saveData = (event) => {
        event.preventDefault();

        try{

            if(!material_reference.trim()){
            setError('Introduce una referencia de producto.');
                return
            }

            if(!material_brand.trim()){
                setError('Introduce una marca de producto.');
                return
            }

            if(!material_description.trim()){
                setError('Introduce una descripción para el producto.');
                return
            }

            if(!material_pvp.trim()){
                setError('Selecciona un precio para el producto.');
                return
            }

            if(!material_ecotax.trim()){
                setError('Selecciona una opción de ecotasa para el producto.');
                return
            }

            const editedMaterial = {
                material_reference: material_reference,
                material_brand: material_brand,
                material_description: material_description,
                material_pvp: material_pvp,
                material_ecotax: material_ecotax
            }

            const updateMaterialResponse = updateMaterials(id, editedMaterial);

            if(updateMaterialResponse.errors){
                setError(updateMaterialResponse.errors);
            }else{
                navigate("/menu/materials", { replace: true });
                event.target.reset();
                setMaterial_reference('');
                setMaterial_brand('');
                setMaterial_description('');
                setMaterial_pvp('');
                setMaterial_ecotax('');
                setError(null);
            }
        }catch(error){

        }
    }

    return (

        <Paper sx={{ width: '50%', overflow: 'hidden', p:3 }}>
            <h3>Edición de Materiales</h3>
            <form onSubmit={ saveData } id="materialEditForm">
                {error ? <span className="text-danger">{error}</span> : null}
                <TextField autoFocus margin="dense" id="material_reference"
                    label="Referencia" type="text" fullWidth variant="standard"
                    onChange={ event => setMaterial_reference(event.target.value) }
                    value={material_reference}
                />
                <TextField autoFocus margin="dense" id="material_brand"
                    label="Marca" type="text" fullWidth variant="standard"
                    onChange={ event => setMaterial_brand(event.target.value) }
                    value={material_brand}
                />
                <InputLabel className="mt-2" id="material_descriptionInput">Descripción</InputLabel>
                <TextareaAutosize autoFocus margin="dense" id="material_description"
                    label="Descripción" type="text" fullWidth variant="standard"
                    onChange={ event => setMaterial_description(event.target.value) }
                    value={material_description}
                />
                <InputLabel className="mt-2" id="material_pvpInput">€</InputLabel>
                <TextField autoFocus margin="dense" id="material_pvp"
                    label="Precio" type="number" fullWidth variant="standard"
                    onChange={ event => setMaterial_pvp(event.target.value) }
                    value={material_pvp}
                />
                <InputLabel className="mt-2" id="ecotaxInput">Ecotasa</InputLabel>
                <Select labelId="Ecotasa" id="material_ecotax" style={{width: '100%'}}
                    value={material_ecotax} label="Ecotasa" onChange={handleChange}> 
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'Si'}>Sí</MenuItem>
                    <MenuItem value={'No'}>No</MenuItem>
                </Select>
            </form>
            <div>
                <Button component={NavLink} to={`/menu/materials`}>Cancelar</Button>
                <Button type="submit" form="materialEditForm" >Editar</Button>
            </div>
        </Paper>

    );
};

export default MaterialsEditForm;
