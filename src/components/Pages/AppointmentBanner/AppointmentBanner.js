import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png';
import bg from '../../../images/appointment-bg.png';
import { Button, Typography } from '@mui/material';

const appointmentBanner = {
    background: `url(${bg})`,
    marginTop: '200px',
    backgroundColor: 'rgba(45,58,74,0.9)',
    backgroundBlendMode: 'darken, luminosity'
}

const AppointmentBanner = () => {
    return (
        <Box style={appointmentBanner} sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img style={{ width: "400px", marginTop: '-110px'}} src={doctor} alt="" />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-start',alignItems: 'center', textAlign: 'left'}}>
                    <Box>
                        <Typography variant="h6" sx={{mb:1}} style={{ color: '#5CE7ED' }}>
                            Appointment
                        </Typography>
                        <Typography variant="h4" sx={{ my: 3 }} style={{ color: 'white' }}>
                            Make an appointment Today
                        </Typography>
                        <Typography variant="h6" sx={{ my: 3 }} style={{ color: 'white', fontSize: '14px', fontWeight: 300, width: '50%' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quo fuga corrupti maiores vero, soluta magni corporis hic doloremque aperiam.
                        </Typography>
                        <Button variant='contained' style={{ backgroundColor: '#5CE7ED' }}>Learn More</Button>
                   </Box>
                </Grid>
               
            </Grid>
        </Box>
    );
};

export default AppointmentBanner;