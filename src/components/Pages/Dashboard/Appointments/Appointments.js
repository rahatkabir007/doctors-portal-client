import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


const Appointments = ({date}) => {
    const { user, token } = useAuth();
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {

        fetch(`http://localhost:5000/appointments?email=${user?.email}&date=${date.toLocaleDateString()}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [date, user.email, token])
   
    return (
        <div>

            <h1>Appointments: {appointments.length}</h1>
            <TableContainer component={Paper}>
                <Table  aria-label="Appointments table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell >Time</TableCell>
                            <TableCell >Service</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow
                                key={appointment?._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {appointment.patientName}
                                </TableCell>
                                <TableCell >{appointment.time}</TableCell>
                                <TableCell >{appointment.serviceName}</TableCell>
                                <TableCell>{appointment.payment ? 'Paid' : <Link to={`/dashboard/payment/${appointment?._id}`}  style={{textDecoration: 'none', color: 'black'}}>Pay</Link>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    );
};

export default Appointments;