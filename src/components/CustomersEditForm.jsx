
  import { Button, TextField, InputLabel, TextareaAutosize } from "@material-ui/core";
  // import validator from "validator";
  import { getCustomersById } from "../services/customer.services";
  import { updateCustomers } from "../services/customer.services";
  import { useParams } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { Paper } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import {NavLink} from 'react-router-dom';

  const CustomersEditForm = () => {
     
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect( () =>{
        const getCustomer = async(id) => {
          const customer = await getCustomersById(id);
          setCustomer_dni(customer.customer_dni);
          setCustomer_name(customer.customer_name);
          setCustomer_email(customer.customer_email);
          setCustomer_address(customer.customer_address);
          setCustomer_city(customer.customer_city);
          setCustomer_province(customer.customer_province);
          setCustomer_cp(customer.customer_cp);
          setCustomer_phone(customer.customer_phone);
          setCustomer_alert(customer.customer_alert);
        }

        getCustomer(id);
    }, []);
  
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
    
        // if(!validator.isMobilePhone(customer_phone)){
        //   setError(`El teléfono ${customer_phone} no es válido.`);
        //   return
        // }
    
        // if(!validator.isEmail(customer_email)){
        //   setError('El email introducido no es válido.');
        //   return
        // }

        const editedCustomer = {
          customer_name: customer_name,
          customer_email: customer_email,
          customer_address: customer_address,
          customer_city: customer_city,
          customer_province: customer_province,
          customer_cp: customer_cp,
          customer_phone: customer_phone,
          customer_alert: customer_alert
        }
    
        const updateCustomerResponse = await updateCustomers(id, editedCustomer);

        if(updateCustomerResponse.errors){

          setError(updateCustomerResponse.errors[0].msg);

        }else{
          navigate("/menu/customers", { replace: true });
          event.target.reset();
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
  
      <Paper sx={{ width: '50%', overflow: 'hidden', p:3}}>
        <h3>Edición de Clientes</h3>
        <form onSubmit={ saveData } id="customerEditForm">
          {error ? <span className="text-danger">{error}</span> : null}
          <TextField autoFocus margin="dense" id="customer_dni"
              label="DNI" type="text" fullWidth variant="standard"
              value={customer_dni}
          />
          <TextField autoFocus margin="dense" id="customer_name"
              label="Nombre" type="text" fullWidth variant="standard"
              value={customer_name}
              onChange={ event => setCustomer_name(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_email"
              label="Dirección Email" type="email" fullWidth variant="standard"
              value={customer_email}
              onChange={ event => setCustomer_email(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_address"
              label="Dirección" type="text" fullWidth variant="standard"
              value={customer_address}
              onChange={ event => setCustomer_address(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_city"
              label="Ciudad" type="text" fullWidth variant="standard"
              value={customer_city}
              onChange={ event => setCustomer_city(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_province"
              label="Provincia" type="text" fullWidth variant="standard"
              value={customer_province}
              onChange={ event => setCustomer_province(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_cp"
              label="CP" type="number" fullWidth variant="standard"
              value={customer_cp}
              onChange={ event => setCustomer_cp(event.target.value) }
          />
          <TextField autoFocus margin="dense" id="customer_phone"
              label="Teléfono" type="number" fullWidth variant="standard"
              value={customer_phone}
              onChange={ event => setCustomer_phone(event.target.value) }
          />
          <InputLabel className="mt-2" id="descriptionInput">Avisos</InputLabel>
          <TextareaAutosize autoFocus margin="dense" id="customer_alert"
              label="Avisos" type="text" fullWidth variant="standard"
              onChange={ event => setCustomer_alert(event.target.value) }
              value={customer_alert}
          /> 
        </form>
        
        <div>
          <Button component={NavLink} to={`/menu/customers`}>Cancelar</Button>
          <Button type="submit" form="customerEditForm">Editar</Button>
        </div>
      </Paper>
  
    );
  };
  
  export default CustomersEditForm;
  