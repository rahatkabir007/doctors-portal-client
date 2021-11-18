import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const Navigation = () => {
    const { user , logOut} = useAuth();
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          Doctors Portal
                        </Typography>
                        <Link to="/appointment" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Appointment</Button></Link>
                        {
                            user?.email ? <div>
                                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Dashboard</Button></Link>
                                <span style={{ textDecoration: 'none', color: 'white' }}>User: {user?.displayName}</span>
                                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><Button onClick={logOut} color="inherit">Logout</Button></Link>
                            </div> : <div>
                            <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Register</Button></Link>
                            <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Login</Button></Link>
                            </div>
                       }
                      
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Navigation;