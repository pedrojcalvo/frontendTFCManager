import { Button, TextField, Select, MenuItem, InputLabel } from "@material-ui/core";
import React, { useState } from "react";
// import validator from "validator";
import { postUsers } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';
import { Paper } from "@mui/material";

const UsersFormModal = () => {

    const navigate = useNavigate();

    const [user_name, setUser_name] = useState('');
    const [user_email, setUser_email] = useState('');
    const [user_password, setUser_password] = useState('');
    const [user_role, setUser_role] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setUser_role(event.target.value);
    };

    const saveData = async (event) => {
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

            if(!user_password.trim()){
                setError('Introduce una contraseña válida.');
                return
            }

            // if(!validator.isStrongPassword(user_password, {minLength: 8, 
            //     minLowercase: 1, minUppercase: 1, minNumbers: 1, 
            //     minSymbols: 1})){
            //         setError('La contraseña debe contener 8 carácteres o más y, al menos, una mayúscula, una minúscula, un número y un símbolo.');
            //         return
            // }

            if(user_role===''){
                setError('Selecciona un role para el usuario.');
                return
            }

            const newUser = {
                user_name: user_name,
                user_email: user_email,
                user_password: user_password,
                user_role: user_role
            }

            const newUserResponse = await postUsers(newUser);

            if(newUserResponse.errors){
              setError(newUserResponse.errors[0].msg);
              return
            }else{
                event.target.reset();
                navigate("/menu/users", { replace: true });
                setUser_name('');
                setUser_email('');
                setUser_password('');
                setUser_role('');
                setError(null);
            }
        }catch(error){

        }
    };

    return (

        <Paper sx={{ width: '50%', overflow: 'hidden', p:3 }}>
            <h3>Nuevo Empleado</h3>
            <form onSubmit={ saveData } id="userForm">
                {error ? <span className="text-danger">{error}</span> : null}
                <TextField autoFocus margin="dense" id="user_name"
                label="Nombre Usuario" type="text" fullWidth variant="standard"
                onChange={ event => setUser_name(event.target.value) }
                />
                <TextField autoFocus margin="dense" id="user_email"
                label="Dirección Email" type="email" fullWidth variant="standard"
                onChange={ event => setUser_email(event.target.value) }
                />
                <TextField autoFocus margin="dense" id="user_password"
                label="Contraseña" type="password" fullWidth variant="standard"
                onChange={ event => setUser_password(event.target.value) }
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
                <Button type="submit" form="userForm">Registrar</Button>
            </div>
        </Paper>
    );
};

export default UsersFormModal;
