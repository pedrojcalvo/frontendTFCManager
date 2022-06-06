
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { getWorkorderById } from '../services/workorder.services';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import WorkIcon from '@material-ui/icons/Work';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import { getWorkorderByProjectId } from '../services/workorder.services';
import AccessDetailsButton from './AccessDetailsButton';
import WorkordersMaterialsTable from './WorkordersMaterialsTable';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { getWorkorderByUserId } from '../services/workorder.services';
import { getUserData } from '../services/login.services';

const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
        borderBottom: 0,
        },
        '&:before': {
        display: 'none',
        },
    }));
    
    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
        },
    }));
    
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));

    export default function WorkordersDetailsView() {

        const { id } = useParams();
        const userLogged = getUserData()

        const [workorder, setWorkorder] = useState([]);
        useEffect( () =>{
            const getWorkorder = async(id) => {
                setWorkorder(await getWorkorderById(id));
            }
            getWorkorder(id);
        }, [id]);

        const projectId = workorder.workorder_project;
        const [projectWorkorders, setProjectWorkorder] = useState([]);
        useEffect( () =>{
            const getProjectWorkorders = async(projectId) => {
                setProjectWorkorder(await getWorkorderByProjectId(projectId));
            }
            getProjectWorkorders(projectId);
        }, [projectId]);

        const userId = workorder.user_id;
        const [workordersByUser, setWorkorders] = useState([]);
        useEffect( () =>{
            const getAllWorkorders = async(userId) => {
                setWorkorders(await getWorkorderByUserId(userId));
            }
            getAllWorkorders(userId);
        }, [userId]);

        const [expanded, setExpanded] = React.useState('panel1');
    
        const handleChange = (panel) => (event, newExpanded) => {
          setExpanded(newExpanded ? panel : false);
        };

        return(
            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography variant="h6">Detalles del Parte de trabajo</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="row">
                        
                        <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6">
                            <Paper elevation={3} className='p-2 mt-3 ms-4'>
                                <h6 className="ms-2 me-2"><WorkIcon />      Parte de Trabajo</h6>
                                <p className="ms-2 me-2">id: {workorder.workorder_id}</p>
                                <p className="ms-2 me-2 mb-3">Proyecto: {workorder.project_name} </p>         
                                <p className="ms-2 me-2 mb-3">Tiempo imputado: {workorder.workorder_hours} Horas {workorder.workorder_minutes} Minutos</p>                     
                                <p className="ms-2 me-2 mb-3">Tarifa asignada: {workorder.hourlyrate_name} - {workorder.hourlyrate_pvp}€/H</p>
                            </Paper>
                            <Paper elevation={3} className='p-2 mt-3 ms-4'>
                                <h6 className="card-title"><PersonIcon />   Parte creado por</h6>
                                <p className="card-text">{workorder.user_name}</p>
                            </Paper>
                            
                            <Paper elevation={3} className='p-2 mt-3 ms-4'>
                                <h6 className="card-title"><AddAlertIcon/>    Avisos</h6>         
                                {
                                    workorder.workorder_alert ? (<p className="card-text">{workorder.workorder_alert}</p>) :
                                    (<p className="card-text">Sin avisos</p>)
                                }                      
                            </Paper>
                        </div>         
                        <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6">
                            <Paper elevation={3} className='p-2 mt-3 ms-4'>                
                                    <h6 className="card-title"><AccountTreeIcon />    Otros Partes del Proyecto</h6>
                                    { userLogged.role === 1 ? (projectWorkorders.map((projectWorkorder)=>{
                                                return(<p className="card-text">id: {projectWorkorder.workorder_id}<span> - {projectWorkorder.user_name}</span><br></br><span> Fecha: {projectWorkorder.workorder_date}</span><AccessDetailsButton id={projectWorkorder.workorder_id} section='projects/workorders'/></p>)
                                            })) : 
                                            (<p className="card-text"> No tienes permisos para ver esta información</p>)
                                    }
                                    
                            </Paper>

                            <Paper elevation={3} className='p-2 mt-3 ms-4'>                
                                    <h6 className="card-title"><AccessibilityIcon />    Otros Partes del Usuario</h6>
                                    {workordersByUser.map((userWorkorders)=>{
                                        return(
                                              <p className="card-text">id: {userWorkorders.workorder_id}<span> - {userWorkorders.project_name}</span><br></br><span> Fecha: {userWorkorders.workorder_date}</span><AccessDetailsButton id={userWorkorders.workorder_id} section='projects/workorders'/></p>
                                            )
                                        })
                                    }
                            </Paper>
                         
                        </div>      
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography variant="h6">Materiales aportados al proyecto</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="row">
                        <WorkordersMaterialsTable />
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }
