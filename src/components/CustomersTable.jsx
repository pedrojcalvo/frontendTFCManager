import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getCustomers } from '../services/customer.services';
import { useEffect, useState } from 'react';
import TableEditButton  from './TableEditButton';
import TableDeleteButton from './TableDeleteButton';
import AccessDetailsButton from './AccessDetailsButton';
import { getUserData } from '../services/login.services';
import TableDeleteButtonDisabled from './TableDeleteButtonDisabled';
import TableEditButtonDisabled from './TableEditButtonDisabled';
import { Typography } from '@material-ui/core';

const columns = [
  { id: 'customer_id', label: 'ID', minWidth: 50 },
  { id: 'customer_dni', label: 'DNI', minWidth: 50 },
  { id: 'customer_name', label: 'Nombre', minWidth: 80 },
  { id: 'customer_email', label: 'Email', minWidth: 100 },
  { id: 'customer_address', label: 'Dirección', minWidth: 50},
  { id: 'customer_city', label: 'Ciudad', minWidth: 40 },
  { id: 'customer_province', label: 'Provincia', minWidth: 50 },
  { id: 'customer_cp', label: 'CP', minWidth: 30 },
  { id: 'customer_phone', label: 'Teléfono', minWidth: 50 },
];

export default function CustomersTable() {

    const [customers, setCustomers] = useState([]);
    useEffect( () =>{
        const getAllCustomers = async() => {
            setCustomers(await getCustomers());
        }
        getAllCustomers();
    }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const userLogged = getUserData();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
                
              ))}
                <TableCell>Detalles</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={customer.code}>
                    {columns.map((column) => {
                      const value = customer[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                        <TableCell><AccessDetailsButton id={customer.customer_id} section='customers'/></TableCell>
                        <TableCell>
                          {
                            userLogged.role === 1 ? ( <TableEditButton  id={customer.customer_id} section='customers' />) : 
                            (<TableEditButtonDisabled />) 
                          }
                        </TableCell>
                        <TableCell>
                          {
                            userLogged.role === 1 ? ( <TableDeleteButton  id={customer.customer_id} section='customers' />) : 
                            (<TableDeleteButtonDisabled />) 
                          }
                           
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    
  );
}
