import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {

    const { user, admin, isLoading } = useAuth();

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
    if (isLoading) {
        return <div className="w-25 mx-auto text-center">
            <CircularProgressWithLabel value={progress} />
        </div>
    }
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) => user.email && admin ? children :
                    <Redirect
                        to={{
                            pathname: "/home",
                            state: { from: location }
                        }}
                    >

                    </Redirect>

                }
            >

            </Route>

        </div>
    );
};

export default AdminRoute;