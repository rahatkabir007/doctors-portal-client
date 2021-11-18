import { Button, Container, Grid, TextField, Typography, Box, CircularProgress, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useLocation, useHistory} from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import login from '../../../../images/login.png';
const Login = () => {


    const [loginData, setLoginData] = useState({});
    const { signInWithGoogle, loginUser, isLoading, success ,passError} = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        
      
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
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
                <Grid sx={{mt: 25}} item xs={12} md={6}>
                    <Typography variant='h3' gutterBottom>
                        Login
                    </Typography>
                    {!isLoading &&
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                name="email"
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
                        <Button sx={{ width: '25%', mt: 5, py: 2 }} type='submit' variant="contained">Login</Button>
                        <p>--------or---------</p>
                        <Button sx={{ width: '35%', mt: 1, py: 1 }} type='submit' variant="contained" onClick={handleGoogleSignIn}>Google Login</Button>
                        <br /><br />
                        {success && <Alert severity="success">{success}</Alert>}
                        {passError && <Alert severity="error">{passError}</Alert>}
                        <br /><br />
                            <span>New User?</span> <Link to='/register'> <Button variant="text">Register Here</Button></Link>
                        </form>
                    }{isLoading && <CircularProgressWithLabel value={progress} />}
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{width: '100%'}} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;