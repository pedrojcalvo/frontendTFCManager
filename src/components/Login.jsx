
import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import LockIcon from '@material-ui/icons/Lock';
import { userLogin } from '../services/login.services';

const Login = (props) => {

    const [user_email, setUser_email] = React.useState('');
    const [user_password, setUser_password] = React.useState('');
    const [error, setError] = React.useState(null);
    const [userLogged, setUserLogged] = React.useState('');

    const navigate = useNavigate();   

    const procesarDatos = async (e) => {
        e.preventDefault();
        try{        
            if(!user_email.trim()){
                setError('Introduce el Email.')
                return
            }
            if(!user_password.trim()){
                setError('Introduce la contraseña.')
                return
            }
            if(user_password.length<10){
                setError('La contaseña debe tener, al menos, 10 carácteres.')
                return
            }

            const loginResponse = await userLogin(user_email, user_password);

            if(loginResponse.error){
                setError(loginResponse.error);
            }else{
                setUserLogged(loginResponse.name);
                setError(null);
                navigate("/menu", { replace: true });
                setUser_email('');
                setUser_password('');
            } 
            
        }catch(e){
            setError('Wrong Credentials');
        }
    };

    return (
        <div className='p-5'>
            <div className= 'mt-5'>
                <LockIcon fontSize="large" className='position-sticky start-50 translate-middle'/>
                <h3 className="text-center info mt-2" color='info'>Acceso Empleados</h3>
                <hr className='ms-5 me-5 mt-4'/>
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <form onSubmit ={procesarDatos}>
                            {
                                error && (
                                    <div className='alert alert-danger'>
                                        {error}
                                    </div>
                                )
                            }
                            <input type="email" className="form-control mb-2" onChange={e => setUser_email(e.target.value)} value={user_email} />
                            <input type="password" className="form-control mb-2"  onChange={e => setUser_password(e.target.value)} value={user_password} />
                            <button className="btn btn-primary btn-lg col-12 mb-5" type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
