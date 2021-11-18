import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Typography ,Container} from '@mui/material';
import chair from '../../../../images/chair.png'
import background from '../../../../images/bg.png'
import { Box } from '@mui/system';
const Banner = () => {

    const bannerBg = {
        background: `url(${background})`,
        height: 450
    }
    const verticalCenter = {
        display: "flex",
        height: 400,
        alignItems: 'center'
        
    }


    return (
        <Container sx={{ flexGrow: 1, textAlign: 'center'}} style={bannerBg}>
            <Grid container spacing={2}>
                <Grid item style={{...verticalCenter,textAlign: 'left'}} xs={12} md={6}>
                    <Box>
                        <Typography variant='h3'>
                            Your New Smile <br />
                            Starts Here
                        </Typography>
                        <Typography variant='h6' sx={{my:3, fontSize: 13, fontWeight: 300, color: 'gray' }}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur incidunt atque quod vel neque, nulla veniam assumenda consectetur laboriosam. Consectetur!
                        </Typography>
                        <Button variant='contained' style={{ backgroundColor: '#5CE7ED' }}>Get Appoinment</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter}>
                  <img src={chair} style={{width:"400px"}} alt="" />
                </Grid>
               
            </Grid>
        </Container>
    );
};

export default Banner;