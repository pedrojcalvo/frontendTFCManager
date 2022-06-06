import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getInactiveProjectsByCustomer } from '../services/project.services';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const columns = [
  { id: 'project_id', label: 'ID', minWidth: 50 },
  { id: 'project_name', label: 'Proyecto', minWidth: 50 },
  { id: 'user_name', label: 'Creado Por', minWidth: 80 },
  { id: 'customer_name', label: 'Cliente', minWidth: 100 },
  { id: 'project_date', label: 'Fecha de creación', minWidth: 40 },
];

export default function CustomersDetailsInactiveProjectsTable() {

  const { id } = useParams();

  const [inactiveProjects, setInactiveProjects] = useState([]);
  useEffect( () =>{
      const getInactiveProjects = async(id) => {
        setInactiveProjects(await getInactiveProjectsByCustomer(id));
      }
      getInactiveProjects(id);
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

  return (
    <Paper className='ms-3' sx={{ width: '97%', overflow: 'hidden' }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {inactiveProjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((inactiveProject) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={inactiveProject.code}>
                    {columns.map((column) => {
                      const value = inactiveProject[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={inactiveProjects.total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
