
import { Button, TextField, Select, MenuItem, InputLabel, TextareaAutosize } from "@material-ui/core"; 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateWorkorders } from "../services/workorder.services";
import { getWorkorderById } from '../services/workorder.services';
import { getHourlyrate } from "../services/hourlyrate.services";
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import { Paper } from "@mui/material";

const WorkordersEditForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    console.log('en el form',id)

    useEffect( () =>{
        const getWorkorder = async(id) => {
            const workorder = await getWorkorderById(id);
            setWorkorder_author(workorder.user_name);
            setWorkorder_project(workorder.project_name);
            setWorkorder_date(workorder.workorder_date);
            setWorkorder_hours(workorder.workorder_hours);
            setWorkorder_minutes(workorder.workorder_minutes);
            setWorkorder_alert(workorder.workorder_alert);
            setWorkorder_hourlyrate(workorder.workorder_hourlyrate)
        }
        getWorkorder(id);
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
    const [workorder_date, setWorkorder_date] = useState('');
    const [workorder_hours, setWorkorder_hours] = useState('');
    const [workorder_minutes, setWorkorder_minutes] = useState('');
    const [workorder_alert, setWorkorder_alert] = useState('');
    const [workorder_hourlyrate, setWorkorder_hourlyrate] = useState('');
    const [error, setError] = useState(null);

    const handleChangeHourlyrate = (event) => {
        setWorkorder_hourlyrate(event.target.value);
    };

    const saveData = (event) => {
        event.preventDefault();

        try{

            // if(!workorder_hours.trim()){
            //     setError('Introduce la cantidad de horas imputadas.');
            //     return
            // }
    
            // if(!workorder_minutes.trim()){
            //     setError('Introduce la cantidad de minutos imputados.');
            //     return
            // }

            // if(!workorder_hourlyrate.trim()){
            //     setError('Asigna una tarifa al parte de trabajo.');
            //     return
            // }
    
            const editedWorkorder = {
                workorder_hours: workorder_hours,
                workorder_minutes: workorder_minutes,
                workorder_alert: workorder_alert,
                workorder_hourlyrate: workorder_hourlyrate,
            }

            const updateWorkorderResponse = updateWorkorders(id, editedWorkorder);

            if(updateWorkorderResponse.errors){
                setError(updateWorkorderResponse.errors);
            }else{
                navigate("/menu/projects/workorderlist", { replace: true });
                event.target.reset();
                setWorkorder_author('');
                setWorkorder_project('');
                setWorkorder_date('');
                setWorkorder_hours('');
                setWorkorder_minutes('');
                setWorkorder_alert('');
                setWorkorder_hourlyrate('');
                setError(null);
            }
        }catch(error){

        }
    }

    return (
        <Paper sx={{ width: '50%', overflow: 'hidden', p:3 }}>
            <h3>Edición de Partes de trabajo</h3>
            <form onSubmit={ saveData } id="workorderEditForm">
                {error ? <span className="text-danger">{error}</span> : null}
                <TextField autoFocus margin="dense" id="workorder_author"
                    label="Nombre del autor" type="text" fullWidth variant="standard"
                    value={workorder_author}
                />
                <TextField autoFocus margin="dense" id="workorder_project"
                    label="Proyecto" type="text" fullWidth variant="standard"
                    value={workorder_project}
                />
                <TextField autoFocus margin="dense" id="workorder_date"
                    label="fecha de creación" type="text" fullWidth variant="standard"
                    value={workorder_date}
                />
                <TextField autoFocus margin="dense" id="workorder_hours"
                    label="Horas" type="number" fullWidth variant="standard"
                    value={workorder_hours}
                    onChange={ event => setWorkorder_hours(event.target.value) }
                />
                <TextField autoFocus margin="dense" id="workorder_minutes"
                    label="Minutos" type="number" fullWidth variant="standard"
                    value={workorder_minutes}
                    onChange={ event => setWorkorder_minutes(event.target.value) }
                />
                <InputLabel className="mt-2" id="workorder_hourlyrateInput">Tarifa</InputLabel>
                <Select labelId="Tarifa" id="workorder_hourlyrate" style={{width: '100%'}}
                    value={workorder_hourlyrate} label="Tarifa" onChange={handleChangeHourlyrate}> 
                
                    {hourlyrate.map((hourlyrate) => (
                        <MenuItem value={`${hourlyrate.hourlyrate_id}`}>{hourlyrate.hourlyrate_name} {hourlyrate.hourlyrate_pvp}€</MenuItem>
                    ))}
                    
                </Select>
                <InputLabel className="mt-2" id="workorder_alertInput">Avisos</InputLabel>
                <TextareaAutosize autoFocus margin="dense" id="workorder_alert"
                    label="Avisos" type="text" fullWidth variant="standard"
                    value={workorder_alert}
                    onChange={ event => setWorkorder_alert(event.target.value) }
                />
                <p>MATERIALES</p> <button>Añadir</button>
            </form>
            <div>
                <Button component={NavLink} to={`/menu/projects/workorderlist`}>Cancelar</Button>
                <Button type="submit" form="workorderEditForm" >Editar</Button>
            </div>
        </Paper>

    );
};

export default WorkordersEditForm;
