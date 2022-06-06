import { Button, Select, MenuItem, InputLabel, TextareaAutosize, TextField, List, ListItem, ListItemText } from "@material-ui/core"; 
import React, { useState, useEffect } from "react";
import { getProjects } from '../services/project.services';
import { getMaterials } from '../services/material.services';
import { postWorkorders } from "../services/workorder.services";
import { getHourlyrate } from "../services/hourlyrate.services";
import { getUserData } from "../services/login.services";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons//DeleteForever';


const WorkordersFormModal = () => {

    const navigate = useNavigate();

    const userLogged = getUserData();
    const id = userLogged.id;
    const name = userLogged.name;

    const [projects, setProjects] = useState([]);
    useEffect( () =>{
        const getAllProjects = async() => {
            setProjects(await getProjects());
        }
        getAllProjects();
    }, []);

    const [hourlyrate, setHourlyrate] = useState([]);
    useEffect( () =>{
        const getAllHourlyrate = async() => {
            setHourlyrate(await getHourlyrate());
        }
        getAllHourlyrate();
    }, []);

    const [workorder_author, setWorkorder_author] = useState('');
    const [workorder_project, setWorkorder_project] = useState('');
    const [workorder_hours, setWorkorder_hours] = useState('');
    const [workorder_minutes, setWorkorder_minutes] = useState('');
    const [workorder_hourlyrate, setWorkorder_hourlyrate] = useState('');
    const [workorder_alert, setWorkorder_alert] = useState('');
    const [error, setError] = useState(null);

    const [material, setMaterial] = useState({});
    const [amount, setAmount] = useState(0);
    const [list, setList] = useState([]);

    const onAddMaterial = () => {
        setList((prevList) => [...prevList, { material, amount }]);
        setMaterial("");
        setAmount("");
    };
    
    const [materials, setMaterials] = useState([]);
    useEffect( ()=>{
        const getAllMaterials = async() => {
            setMaterials(await getMaterials());
        }
        getAllMaterials();
        
    }, []);

    const handleChangeMaterial = (event) => {
        setMaterial(event.target.value);
    }

    console.log(workorder_author)
    const handleChangeProject = (event) => {
        setWorkorder_project(event.target.value);
    };

    const onRemoveMaterial = (index) => {
        setList((prevList) => prevList.filter((_, arrIndex) => index !== arrIndex));
    };

    const handleChangeHourlyrate = (event) => {
        setWorkorder_hourlyrate(event.target.value);
    };

    const saveData = async(event) => {
        event.preventDefault();

        try{

            if(!workorder_project.trim()){
                setError('Asigna el parte a un proyecto.');
                return
            }

            if(!workorder_hourlyrate.trim()){
                setError('Asigna una tarifa al parte de trabajo.');
                return
            }

            if(!workorder_hours.trim()){
                setError('Introduce la cantidad de horas imputadas.');
                return
            }

            if(!workorder_minutes.trim()){
                setError('Introduce la cantidad de minutos imputados.');
                return
            }

            const newWorkorderAndMaterials = {
                workorder_author: id,
                workorder_project: workorder_project,
                workorder_hours: workorder_hours,
                workorder_minutes: workorder_minutes,
                workorder_alert: workorder_alert,
                workorder_hourlyrate: workorder_hourlyrate,
                material_list: list.map(element =>{
                        return {material_id: element.material.material_id, 
                                material_amount: element.amount }
                        })
            }

            const newWorkorderAndMaterialsResponse = await  postWorkorders(newWorkorderAndMaterials);
            console.log(list);
        
            
            
            if(newWorkorderAndMaterialsResponse.errors){
                setError(newWorkorderAndMaterialsResponse.errors[0].msg);
                return
            }else{
                event.target.reset();
                navigate("/menu/projects/workorderlist", { replace: true });
                setWorkorder_author('');
                setWorkorder_project('');
                setWorkorder_hours('');
                setWorkorder_minutes('');
                setWorkorder_alert('');
                setWorkorder_hourlyrate('');
                setError('');
            }
        }catch(eror){
            setError(error);
        }
    };

    return (

        <Paper className="col col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8" sx={{ overflow: 'hidden', p:3 }} >
            <h3>Nuevo Parte de trabajo</h3>
            <form onSubmit={ saveData } id="workorderForm">
                {error ? <span className="text-danger">{error}</span> : null}
                <TextField autoFocus margin="dense" id="workorder_author2"
                    label="Autor" type="text" className="col col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-3" variant="standard"
                    value = {name}
                />
                <InputLabel id="workorder_projectInput">Proyecto</InputLabel>
                <Select labelId="Proyecto" id="workorder_project" className="mt-2 col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    value={workorder_project} label="Proyecto" onChange={handleChangeProject}> 
                
                    {projects.map((projects) => (
                        <MenuItem value={`${projects.project_id}`}>{projects.project_name}</MenuItem>
                    ))}
                    
                </Select>
                <InputLabel className="mt-4 col col-xs-12 col-sm-12 col-md-8 col-lg-4 col-xl-4">Tiempo imputado</InputLabel>
                <Input
                    autoFocus margin="dense" id="workorder_hours" className="mt-2 me-5 col col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3" variant="standard"
                    value={workorder_hours}
                    startAdornment={<InputAdornment position="start">H.</InputAdornment>}
                    onChange={ event => setWorkorder_hours(event.target.value) }
                />
                <Input
                    autoFocus margin="dense" id="workorder_minutes" className="mt-2 col col-xs-6 col-sm-3 col-md-3 col-lg-3 col-xl-3" variant="standard"
                    value={workorder_minutes}
                    startAdornment={<InputAdornment position="start">M.</InputAdornment>}
                    onChange={ event => setWorkorder_minutes(event.target.value) }
                />
                <InputLabel className="mt-4 col col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4" id="workorder_hourlyrateInput">Tarifa</InputLabel>
                <Select labelId="Tarifa" id="workorder_hourlyrate" className="col col-sm-12 col-md-6 col-lg-6 col-xl-4"
                    value={workorder_hourlyrate} label="Tarifa" onChange={handleChangeHourlyrate}> 
                
                    {hourlyrate.map((hourlyrate) => (
                        <MenuItem value={`${hourlyrate.hourlyrate_id}`}>{hourlyrate.hourlyrate_name} {hourlyrate.hourlyrate_pvp}€</MenuItem>
                    ))}
                    
                </Select>
                <InputLabel className="mt-4 col col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3" id="workorder_alertInput">Avisos</InputLabel>
                <TextareaAutosize autoFocus margin="dense" id="workorder_alert"
                    label="Avisos" type="text" className="mt-2 col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" variant="standard"
                    value={workorder_alert}
                    onChange={ event => setWorkorder_alert(event.target.value) }
                />
                <div>
                    <InputLabel className="mt-4 col col-xs-8 col-sm-8 col-md-8 col-lg-6 col-xl-4" id="material_idInput">Materiales</InputLabel>
                    <Select labelId="Materiales" id="material_id" className=" colcol-xs-12 col-sm-8 col-md-6 col-lg-6 col-xl-8"
                        value={material} label="Materiales" onChange={handleChangeMaterial}> 
                    
                        {materials.map((material) => (
                            <MenuItem value={material}>{material.material_reference} - {material.material_description} </MenuItem>
                        ))}
                        
                    </Select>
                    <Input
                        autoFocus margin="dense" type="number" id="material_amount" variant="standard"
                        value={amount} className="ms-3 col col-xs-4 col-sm-2 col-md-2 col-lg-2 col-xl-2"  label="Cantidad"
                        onChange={ event => setAmount(event.target.value) }
                    />
                    <Button className="ms-3" color="primary" onClick={onAddMaterial}>Añadir</Button>
                </div>

                <List>
                    {list.map((el, index) => (
                        <ListItemText primaryTypographyProps={{fontSize: '6px'}} >
                            {el.material.material_reference} {el.material.material_description} {el.amount}
                            <Button onClick={() => onRemoveMaterial(index)} startIcon={<DeleteForeverIcon color="error"/>}></Button>
                        </ListItemText>
                    ))}
                </List>
            </form>
            <div>
                <Button component={NavLink} to={`/menu/projects/workorderlist`}>Cancelar</Button>
                <Button type="submit" form="workorderForm" color="primary">Registrar</Button>
            </div>
        </Paper>
    );
};

export default WorkordersFormModal;
