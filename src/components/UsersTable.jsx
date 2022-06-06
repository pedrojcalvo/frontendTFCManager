import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getUsers } from '../services/user.services';
import { useEffect, useState } from 'react';
import TableEditButton  from './TableEditButton';
import TableDeleteButton from './TableDeleteButton';
import { getUserData } from '../services/login.services';
import TableDeleteButtonDisabled from './TableDeleteButtonDisabled';
import TableEditButtonDisabled from './TableEditButtonDisabled';
import AccessDetailsButton from './AccessDetailsButton';

const columns = [
  { id: 'user_id', label: 'ID', minWidth: 50 },
  { id: 'user_name', label: 'Nombre', minWidth: 80 },
  { id: 'user_email', label: 'Email', minWidth: 100 },
  { id: 'role_name', label: 'Rol', minWidth: 50},
];

export default function UsersTable() {

    const [users, setUsers] = useState([]);
    useEffect( () =>{
        const getAllUsers = async() => {
            setUsers(await getUsers());
        }
        getAllUsers();
    }, []);

    const userLogged = getUserData();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                        <TableCell><AccessDetailsButton id={user.user_id} section='users'/></TableCell>
                        <TableCell>
                          {
                            userLogged.role === 1 ? ( <TableEditButton  id={user.user_id} section='users' />) : 
                            (<TableEditButtonDisabled />) 
                          }
                        </TableCell>
                        <TableCell>
                          {
                            userLogged.role === 1 ? ( <TableDeleteButton  id={user.user_id} section='users' />) : 
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
