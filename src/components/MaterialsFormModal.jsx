import { Button, TextField, Select, MenuItem, InputLabel, TextareaAutosize } from "@material-ui/core"; 
import React, { useState } from "react";
import { postMaterials } from "../services/material.services";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';

const MaterialsFormModal = () => {

    const navigate = useNavigate();

    const [material_reference, setMaterial_reference] = useState('');
    const [material_brand, setMaterial_brand] = useState('');
    const [material_description, setMaterial_description] = useState('');
    const [material_pvp, setMaterial_pvp] = useState('');
    const [material_ecotax, setMaterial_ecotax] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setMaterial_ecotax(event.target.value);
    };

    const saveData = async (event) => {
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

            const newMaterial = {
                material_reference: material_reference,
                material_brand: material_brand,
                material_description: material_description,
                material_pvp: material_pvp,
                material_ecotax: material_ecotax
            }

            const newMaterialResponse =  await postMaterials(newMaterial);
            if(newMaterialResponse.errors){
                setError(newMaterialResponse.errors[0].msg);
                return
            }else{
                event.target.reset();
                navigate("/menu/materials", { replace: true });
                setMaterial_reference('');
                setMaterial_brand('');
                setMaterial_description('');
                setMaterial_pvp('');
                setMaterial_ecotax('');
                setError(null);
            }
        }catch(error){
            setError(error);
        }     
    };

    return (

        <Paper sx={{ width: '50%', overflow: 'hidden', p:3 }}>
            <h3>Nuevo Producto</h3>
            <form onSubmit={ saveData } id="materialForm">
                {error ? <span className="text-danger">{error}</span> : null}
                <TextField autoFocus margin="dense" id="material_reference"
                    label="Referencia" type="text" fullWidth variant="standard"
                    onChange={ event => setMaterial_reference(event.target.value) }
                />
                <TextField autoFocus margin="dense" id="material_brand"
                    label="Marca" type="text" fullWidth variant="standard"
                    onChange={ event => setMaterial_brand(event.target.value) }
                />
                <InputLabel className="mt-2" id="material_descriptionInput">Descripción</InputLabel>
                <TextareaAutosize autoFocus margin="dense" id="material_description"
                    label="Descripción" type="text" fullWidth variant="standard"
                    onChange={ event => setMaterial_description(event.target.value) }
                />
                <Input
                    autoFocus margin="dense" id="material_pvp" fullWidth variant="standard"
                    value={material_pvp.amount}
                    startAdornment={<InputAdornment position="start">€</InputAdornment>}
                    onChange={ event => setMaterial_pvp(event.target.value) }
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
                <Button type="submit" form="materialForm">Registrar</Button>
            </div>
        </Paper>
    );
};

export default MaterialsFormModal;
