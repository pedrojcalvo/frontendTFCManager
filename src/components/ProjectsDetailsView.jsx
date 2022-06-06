
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ProjectsDetailsWorkorderTable from './ProjectsDetailsWorkorderTable';
import { useParams } from 'react-router-dom';
import { getProjectsByCustomer } from '../services/project.services';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import WorkIcon from '@material-ui/icons/Work';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import { getProjectById } from '../services/project.services';
import { getWorkorderCountByProjectId } from '../services/workorder.services';
import { getWorkorderMinutesByProjectId } from '../services/workorder.services';
import { getWorkorderMinutesByUserIdAndProjectId } from '../services/workorder.services';
import { getMaterialByProjectId } from '../services/material.services';
import { getMaterialTotalPvpByProjectId } from '../services/material.services';
import { getWorkorderHoursPvpByProjectId } from '../services/workorder.services';
import AccessDetailsButton from './AccessDetailsButton';
import ProjectMaterialsTable from './ProjectMaterialsTable';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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

export default function ProjectsDetailsView() {
  const { id } = useParams();
  const projectId = id;

  const [error, setError] = useState(null);

  const [project, setProject] = useState([]);
  useEffect(() => {
    const getProject = async (id) => {
      setProject(await getProjectById(id));
    };
    getProject(id);
  }, [id]);

  const customerId = project.project_customer;

  const [customerProjects, setCustomerProjects] = useState([]);
  useEffect(() => {
    const getCustomerProjects = async (customerId) => {
      setCustomerProjects(await getProjectsByCustomer(customerId));
    };
    getCustomerProjects(customerId);
  }, [customerId]);

  const [projectWorkorders, setProjectWorkorders] = useState([]);
  const [workordersMinutes, setWorkordersMinutes] = useState(null);
  const [workordersMinutesByUser, setWorkordersMinutesByUser] = useState(null);
  const [materialsTotalPvpByProject, setMaterialsTotalPvpByProject] = useState(null);
  const [materialsByProject, setMaterialsByProject] = useState([]);
  const [workorderMinutesTotalPvp, setWorkorderMinutesTotalPvp] = useState(null);

  useEffect(() => {
    const executeRequest = async() => {
      setProjectWorkorders(await getWorkorderCountByProjectId(projectId));
      setWorkordersMinutes(await getWorkorderMinutesByProjectId(projectId));
      setWorkordersMinutesByUser(await getWorkorderMinutesByUserIdAndProjectId(projectId));
      setMaterialsByProject(await getMaterialByProjectId(projectId));
      setMaterialsTotalPvpByProject(await getMaterialTotalPvpByProjectId(projectId));
      setWorkorderMinutesTotalPvp(await getWorkorderHoursPvpByProjectId(projectId));
    }
    executeRequest()
  }, [projectId]);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  console.log(workordersMinutes);
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h6">Detalles del Proyecto</Typography>
        </AccordionSummary>
        <AccordionDetails className="row">
          <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <Paper elevation={3} className="p-2 mt-3 ms-4">
              <h6 className="ms-2 me-2">
                <WorkIcon /> Proyecto
              </h6>
              <p className="ms-2 me-2">{project.project_name}</p>
              <p className="ms-2 me-2">id: {project.project_id}</p>
              <p className="ms-2 me-2 mb-3">Cliente: {project.customer_name}</p>
            </Paper>
            <Paper elevation={3} className="p-2 mt-3 ms-4">
              <h6 className="card-title">
                <PersonIcon /> Proyecto creado por
              </h6>
              <p className="card-text">{project.user_name}</p>
            </Paper>
            <Paper elevation={3} className="p-2 mt-3 ms-4">
              <h6 className="card-title">
                <AccountTreeIcon /> Otros Proyectos del Cliente
              </h6>
              {customerProjects.map((customerProject) => {
                return (
                  <p className="card-text">
                    {customerProject.project_name}
                    <AccessDetailsButton
                      id={customerProject.project_id}
                      section="projects"
                    />
                  </p>
                );
              })}
            </Paper>
            <Paper elevation={3} className="p-2 mt-3 ms-4">
              <h6 className="card-title">
                <AddAlertIcon /> Avisos
              </h6>
              {project.project_alert ? (
                <p className="card-text">{project.project_alert}</p>
              ) : (
                <p className="card-text">Sin avisos</p>
              )}
            </Paper>
          </div>
          <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <Paper elevation={3} className="p-2 mt-3 ms-4">
              <h6 className="card-title">
                <AssignmentTurnedInIcon /> Partes de trabajo:{" "}
                {projectWorkorders}
              </h6>

              <h6 className="card-title">
                <AccessTimeIcon /> Horas imputadas:{" "}
              </h6>
              {!workordersMinutes ? (
                <p>No hay horas imputadas al proyecto</p>
              ) : (
                <p>
                  {Math.floor(workordersMinutes.work_minutes/60)} horas y {workordersMinutes.work_minutes%60} minutos
                </p>
              )}
              <h6 className="card-title">
                <AccessTimeIcon /> Horas por empleado:{" "}
              </h6>
              {!workordersMinutesByUser ? (
                <p>No hay horas imputadas al proyecto </p>
              ) : (
                workordersMinutesByUser.map((minutesByUser) => {
                  return (
                    <p className="card-text">
                      {minutesByUser.user_name}:{" "}
                      {Math.floor(minutesByUser.work_minutes / 60)} H. y{" "}
                      {minutesByUser.work_minutes % 60} min.{" "}
                    </p>
                  );
                })
              )}
            </Paper>
            <Paper elevation={3} className="p-2 mt-3 ms-4">
              <h6 className="card-title">
                <AttachMoneyIcon /> Importe acumulado
              </h6>
              {!workorderMinutesTotalPvp ? (
                <h6 className="card-title"> En Horas de trabajo: 0 €</h6>
              ) : (
                <h6 className="card-title">
                  {" "}
                  En Horas de trabajo: {
                    workorderMinutesTotalPvp.amountPerHours
                  }{" "}
                  €.
                </h6>
              )}
              {!materialsTotalPvpByProject ? (
                <h6 className="card-title"> En Matriales gastados: 0 €</h6>
              ) : (
                <h6 className="card-title">
                  {" "}
                  En Matriales gastados: {
                    materialsTotalPvpByProject.total_cost
                  }{" "}
                  €.
                </h6>
              )}
            </Paper>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant="h6">Partes de Trabajo</Typography>
        </AccordionSummary>
        <AccordionDetails className="row">
          <ProjectsDetailsWorkorderTable />
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography variant="h6">Materiales usados en el proyecto</Typography>
          </AccordionSummary>
          <AccordionDetails className="row">
              <ProjectMaterialsTable />
          </AccordionDetails>
      </Accordion>
</div>
  );
}; 
