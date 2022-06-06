
import { Button, TextField, Select, MenuItem, InputLabel, TextareaAutosize } from "@material-ui/core"; 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateProjects } from "../services/project.services";
import { getProjectById } from "../services/project.services";
import { getCustomers } from '../services/customer.services';
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import { Paper } from "@mui/material";

const ProjectsEditForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [customers, setCustomers] = useState([]);
    useEffect( () =>{
        const getAllCustomers = async() => {
            setCustomers(await getCustomers());
        }
        getAllCustomers();
    }, []);

    useEffect( () =>{
        const getProject = async(id) => {
          const project = await getProjectById(id);
          setProject_name(project.project_name);
          setProject_author(project.user_name)
          setProject_customer(project.project_customer);
          setProject_description(project.project_description);
          setProject_alert(project.project_alert)
        }

        getProject(id);
    }, []);


    const [project_name, setProject_name] = useState('');
    const [project_author, setProject_author] = useState('');
    const [project_customer, setProject_customer] = useState('');
    const [project_description, setProject_description] = useState('');
    const [project_alert, setProject_alert] = useState('');
    const [error, setError] = useState(null);

    const handleChangeCustomer = (event) => {
        setProject_customer(event.target.value);
    };


    const saveData = (event) => {
        event.preventDefault();

        try{

            if(!project_name.trim()){
                setError('Introduce un nombre para el proyecto.');
                 return
            }
     
            if(!project_description.trim()){
                setError('Escribe una descripción para el proyecto.');
                return
            }

            const editedProject = {
                project_name: project_name,
                project_customer: project_customer,
                project_description: project_description,
                project_alert: project_alert,
            }

            const updateProjectResponse = updateProjects(id, editedProject);

            if(updateProjectResponse.errors){
                setError(updateProjectResponse.errors);
            }else{
                navigate("/menu/projects/projectlist", { replace: true });
                event.target.reset();
                setProject_name('');
                setProject_customer('');
                setProject_description('');
                setProject_alert('');
                setError(null);
            }
        }catch(error){

        }
    }

    return (
        <Paper sx={{ width: '50%', overflow: 'hidden', p:3 }}>
            <h3>Edición de Proyectos</h3>
            <form onSubmit={ saveData } id="projectEditForm">
                {error ? <span className="text-danger">{error}</span> : null}
                <TextField autoFocus margin="dense" id="project_name"
                    label="Nombre del proyecto" type="text" fullWidth variant="standard"
                    onChange={ event => setProject_name(event.target.value) }
                    value={project_name}
                />
                <TextField autoFocus margin="dense" id="project_author"
                    label="Nombre del autor" type="text" fullWidth variant="standard"
                    value={project_author}
                />
                <InputLabel className="mt-2" id="descriptionInput">Descripción</InputLabel>
                <TextareaAutosize autoFocus margin="dense" id="project_description"
                    label="Descripción" type="text" fullWidth variant="standard"
                    onChange={ event => setProject_description(event.target.value) }
                    value={project_description}
                />
                <InputLabel className="mt-2" id="project_customerInput">Cliente</InputLabel>
                <Select labelId="Cliente" id="project_customer" style={{width: '100%'}}
                    value={project_customer} label="Cliente" onChange={handleChangeCustomer}> 
                    {customers.map((customers) => (
                        <MenuItem value={`${customers.customer_id}`}>{customers.customer_name}</MenuItem>
                    ))}
                    
                </Select>
                <InputLabel className="mt-2" id="project_alertInput">Avisos</InputLabel>
                <TextareaAutosize autoFocus margin="dense" id="project_alert"
                    label="Avisos" type="text" fullWidth variant="standard"
                    value={project_alert}
                    onChange={ event => setProject_alert(event.target.value) }
                />
            </form>
            <div>
                <Button component={NavLink} to={`/menu/projects/projectlist`}>Cancelar</Button>
                <Button type="submit" form="projectEditForm" >Editar</Button>
            </div>
        </Paper>

    );
};

export default ProjectsEditForm;
