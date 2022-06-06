import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getInactiveWorkorders } from '../services/workorder.services';
import { useEffect, useState } from 'react';
import TableRetrieveButton from './TableRetrieveButton'

const columns = [
  { id: 'workorder_id', label: 'ID', minWidth: 50 },
  { id: 'user_name', label: 'Creado Por', minWidth: 50 },
  { id: 'project_name', label: 'Proyecto', minWidth: 80 },
  { id: 'workorder_date', label: 'Fecha de creación', minWidth: 100 },
  { id: 'workorder_hours', label: 'Horas', minWidth: 40 },
  { id: 'workorder_minutes', label: 'Minutos', minWidth: 40 },
];

export default function WorkordersTable() {

    const [workorders, setWorkorders] = useState([]);
    useEffect( () =>{
        const getAllWorkorders = async() => {
            setWorkorders(await getInactiveWorkorders());
        }
        getAllWorkorders();
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
                <TableCell>Recuperar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workorders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((workorder) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={workorder.code}>
                    {columns.map((column) => {
                      const value = workorder[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell><TableRetrieveButton  id={workorder.workorder_id} section='projects/workorder' /></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={workorders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
