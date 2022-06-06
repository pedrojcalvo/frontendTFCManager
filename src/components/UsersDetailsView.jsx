
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import UsersDetailsWorkordersTable from './UsersDetailsWorkordersTable';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import BusinessIcon from '@material-ui/icons/Business';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import { getUserById} from '../services/user.services';

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

export default function UsersDetailsView() {

    const { id } = useParams();

    const [user, setUser] = useState([]);

    useEffect( () =>{
        const getUser = async(id) => {
            setUser(await getUserById(id));
        }
        getUser(id);
    }, []);

   

    const [expanded, setExpanded] = React.useState('panel1');
    
    const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    };

    return(
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography variant="h6">Detalles de Empleado</Typography>
                </AccordionSummary>
                <AccordionDetails className="row">
                    
                    <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <Paper elevation={3} className='p-2 ms-4'>
                            <h6 className="ms-2 me-2"><PersonIcon />      Empleado</h6>
                            <p className="ms-2 me-2">{user.user_name}</p>
                            <p className="ms-2 me-2">id: {user.user_id}</p>
                            <p className="ms-2 me-2">rol: {user.role_name}</p>                     
                        </Paper>
                        <Paper elevation={3} className='p-2 mt-3 ms-4'>
                            <h6 className="card-title"><ContactMailIcon/>   Contacto</h6>
                            <AlternateEmailIcon/>
                            <p className="card-text">{user.user_email}</p>
                            <PhoneInTalkIcon/>
                            <p className="card-text">{user.user_phone}</p>

                        </Paper>
                    </div>
                    <div className="col col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <Paper elevation={3} className='p-2 mt-3 ms-4'>                
                            <h6 className="card-title"><BusinessIcon />    Dirección</h6>
                            <p className="card-text">{user.user_address}</p>
                            <p className="card-tex">{`${user.user_city} (${user.user_cp})`}</p>
                            <p className="card-text">{user.user_province}</p>
                        </Paper>
                    </div>                 
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography variant="h6">Partes de trabajo</Typography>
                </AccordionSummary>
                <AccordionDetails className="row">
                    <UsersDetailsWorkordersTable />
                </AccordionDetails>
            </Accordion>
            
        </div>
    )
};
