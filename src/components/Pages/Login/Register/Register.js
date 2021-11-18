import { Button, Container, Grid, TextField, Box, Typography, CircularProgress, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import login from '../../../../images/login.png';

const Register = () => {
    const { registerUser, isLoading, success, authError, setAuthError} = useAuth();
    const [loginData, setLoginData] = useState({});
    const [match, setMatch] = useState('');

   
    const history = useHistory();

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
      

    }

    const handleLoginSubmit = e => {
        if (loginData.password === loginData.password2) {
            setMatch('');
            setAuthError('');
            registerUser(loginData.email, loginData.password, loginData.name, history, setMatch);
           
        }
        else {
            setMatch("Password Didn't Match");
            setAuthError('');
        }
        e.preventDefault();
      
    }


    //circular progress
    function CircularProgressWithLabel(props) {
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="text.secondary">
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    CircularProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate variant.
         * Value between 0 and 100.
         * @default 0
         */
        value: PropTypes.number.isRequired,
    };
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid sx={{ mt: 20 }} item xs={12} md={6}>
                    <Typography variant='h3' gutterBottom>
                        Register
                    </Typography>
                    {!isLoading &&
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                name="name"
                                type='text'
                                onBlur={handleOnBlur}
                            sx={{ width: '75%', m: 1 }} id="standard-basic" label="Your Name" variant="standard" required/><br />
                            <TextField
                                name="email"
                                type='email'
                                onBlur={handleOnBlur}
                                sx={{ width: '75%', m: 1 }} id="standard-basic" label="Your Email" variant="standard" required/><br />
                            <TextField
                                name="password"
                                onBlur={handleOnBlur}
                                sx={{ width: '75%', m: 1 }}
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            variant="standard"
                            required
                            />
                            <TextField
                                name="password2"
                                onBlur={handleOnBlur}
                                sx={{ width: '75%', m: 1 }}
                                id="standard-password-input"
                                label="Re-type Password"
                                type="password"
                                autoComplete="current-password"
                            variant="standard"
                            required
                            />
                            <Button sx={{ width: '25%', mt: 5, py: 2 }} type='submit' variant="contained">Register</Button><br /><br />
                            <span>Already an User?</span> <Link to='/login'> <Button variant="text">Login here</Button></Link>
                        </form>
                    }{isLoading && <CircularProgressWithLabel value={progress} />}
                    {match && <Alert severity="error">{match}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;