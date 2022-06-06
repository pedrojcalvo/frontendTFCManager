
import { Button, TextField, Select, MenuItem, InputLabel, TextareaAutosize } from "@material-ui/core"; 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateUsers } from "../services/user.services";
import { getUserById } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import { Paper } from "@mui/material";
// import validator from "validator";

const UsersEditForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect( () =>{
        const getUser = async(id) => {
          const user = await getUserById(id);
          setUser_name(user.user_name);
          setUser_email(user.user_email);
          setUser_address(user.user_address);
          setUser_city(user.user_city);
          setUser_province(user.user_province);
          setUser_cp(user.user_cp);
          setUser_phone(user.user_phone);
          setUser_role(user.user_role);
        }

        getUser(id);
    }, []);


    const [user_name, setUser_name] = useState('');
    const [user_email, setUser_email] = useState('');
    const [user_address, setUser_address] = useState('');
    const [user_city, setUser_city] = useState('');
    const [user_province, setUser_province] = useState('');
    const [user_cp, setUser_cp] = useState('');
    const [user_phone, setUser_phone] = useState('');
    const [user_role, setUser_role] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setUser_role(event.target.value);
    };

    const saveData = (event) => {
        event.preventDefault();

        try{
        
            if(!user_name.trim()){
                setError('Introduce un nombre de usuario.');
                return
            }
    
            if(!user_email.trim()){
                setError('Es necesario introducir un email.');
                return
            }
    
            // if(!validator.isEmail(user_email)){
            //     setError('El email introducido no es válido.');
            //     return
            // }
    
            if(user_role===''){
                setError('Selecciona un role para el usuario.');
                return
            }

            const editedUser = {
                user_name: user_name,
                user_email: user_email,
                user_address : user_address,
                user_city : user_city,
                user_province : user_province,
                user_cp : user_cp,
                user_phone : user_phone,
                user_role: user_role
            }

            const updateUsersResponse = updateUsers(id, editedUser);

            if(updateUsersResponse.errors){
                setError(updateUsersResponse.errors);
            }else{
                navigate("/menu/users", { replace: true });
                event.target.reset();
                setUser_name('');
                setUser_email('');
                setUser_address('');
                setUser_city('');
                setUser_province('');
                setUser_cp('');
                setUser_phone('');
                setUser_role('');
                setError(null);
            }
        }catch(error){

        }
    }

    return (

        <Paper sx={{ width: '50%', overflow: 'hidden', p:3 }}>
            <h3>Edición de Empleados</h3>
            <form onSubmit={ saveData } id="userEditForm">
                {error ? <span className="text-danger">{error}</span> : null}
                <TextField autoFocus margin="dense" id="user_name"
                    label="Nombre Usuario" type="text" fullWidth variant="standard"
                    onChange={ event => setUser_name(event.target.value) }
                    value={user_name}
                />
                <TextField autoFocus margin="dense" id="user_email"
                    label="Dirección Email" type="email" fullWidth variant="standard"
                    onChange={ event => setUser_email(event.target.value) }
                    value={user_email}
                />
                <InputLabel className="mt-2" id="RoleInput">Role</InputLabel>
                <Select labelId="label" id="user_role" style={{width: '100%'}}
                value={user_role} label="Role" onChange={handleChange}> 
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={1}>Administrador</MenuItem>
                    <MenuItem value={2}>Empleado</MenuItem>
                </Select>
            </form>
            <div>
                <Button component={NavLink} to={`/menu/users`}>Cancelar</Button>
                <Button type="submit" form="userEditForm" >Editar</Button>
            </div>
        </Paper>

    );
};

export default UsersEditForm;
