
import { Button, TextField, InputLabel, TextareaAutosize } from "@material-ui/core";
import React, { useState } from "react";
// import validator from "validator";
import { postCustomers } from "../services/customer.services";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {NavLink} from 'react-router-dom';

const CustomersFormModal = () => {

  const navigate = useNavigate();

  const [customer_dni, setCustomer_dni] = useState('');
  const [customer_name, setCustomer_name] = useState('');
  const [customer_email, setCustomer_email] = useState('');
  const [customer_address, setCustomer_address] = useState('');
  const [customer_city, setCustomer_city] = useState('');
  const [customer_province, setCustomer_province] = useState('');
  const [customer_cp, setCustomer_cp] = useState('');
  const [customer_phone, setCustomer_phone] = useState('');
  const [customer_alert, setCustomer_alert] = useState('');
  const [error, setError] = useState(null);

  const saveData = async (event) => {
    event.preventDefault();
    try{
      if(!customer_name.trim()){
        setError('Introduce un nombre de usuario.');
        return
      }

      if(!customer_email.trim()){
        setError('Es necesario introducir un email.');
        return
      }

      if(!customer_phone.trim()){
        setError('Es necesario introducir un teléfono.');
        return
      }

      // if(!validator.isMobilePhone(customer_phone, 'es-ES')){
      //   setError(`El teléfono ${customer_phone} no es válido.`);
      //   return
      // }

      // if(!validator.isEmail(customer_email)){
      //   setError('El email introducido no es válido.');
      //   return
      // }

      const newCustomer = {
        customer_dni: customer_dni,
        customer_name: customer_name,
        customer_email: customer_email,
        customer_address: customer_address,
        customer_city: customer_city,
        customer_province: customer_province,
        customer_cp: customer_cp,
        customer_phone: customer_phone,
        customer_alert: customer_alert
      }

      
      const newCustomerResponse = await postCustomers(newCustomer);

      if(newCustomerResponse.errors){
        setError(newCustomerResponse.errors[0].msg);
        return
      }else{
        event.target.reset();
        navigate("/menu/customers", { replace: true });
        setCustomer_dni('');
        setCustomer_name('');
        setCustomer_email('');
        setCustomer_address('');
        setCustomer_city('');
        setCustomer_province('');
        setCustomer_cp('');
        setCustomer_phone('');
        setCustomer_alert('');
        setError(null);
      }
      
    }catch(error){
      setError(error);
    }
  }

  return (
      <Paper sx={{ width: '50%', overflow: 'hidden', p:3 }}>
        <h3>Nuevo Cliente</h3>
        <form onSubmit={ saveData } id="customerForm">
          {error ? <span className="text-danger">{error}</span> : null}
          <TextField autoFocus margin="dense" id="customer_dni"
              label="DNI" type="text" fullWidth variant="standard"
              onChange={ event => setCustomer_dni(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_name"
              label="Nombre" type="text" fullWidth variant="standard"
              onChange={ event => setCustomer_name(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_email"
              label="Dirección Email" type="email" fullWidth variant="standard"
              onChange={ event => setCustomer_email(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_address"
              label="Dirección" type="text" fullWidth variant="standard"
              onChange={ event => setCustomer_address(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_city"
              label="Ciudad" type="text" fullWidth variant="standard"
              onChange={ event => setCustomer_city(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_province"
              label="Provincia" type="text" fullWidth variant="standard"
              onChange={ event => setCustomer_province(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_cp"
              label="CP" type="number" fullWidth variant="standard"
              onChange={ event => setCustomer_cp(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_phone"
              label="Teléfono" type="number" fullWidth variant="standard"
              onChange={ event => setCustomer_phone(event.target.value) }
          />
          <InputLabel className="mt-2" id="descriptionInput">Avisos</InputLabel>
          <TextareaAutosize autoFocus margin="dense" id="customer_alert"
              label="Avisos" type="text" fullWidth variant="standard"
              onChange={ event => setCustomer_alert(event.target.value) }
          />
      </form>
        <div>
          <Button component={NavLink} to={`/menu/customers`}>Cancelar</Button>
          <Button type="submit" form="customerForm">Registrar</Button>
        </div>
    </Paper>

  );
};

export default CustomersFormModal;
