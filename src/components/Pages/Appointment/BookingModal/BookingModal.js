import { Backdrop, Fade, Modal, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    background: 'white',
    color: "black",
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: "center",
    p: 4,
};
const BookingModal = ({ openBooking, handleBookingClose, booking, date, setBookingSuccess}) => {
    const { name, time , price} = booking;
    const { user } = useAuth();
    const initialBookingInfo = { patientName: user.displayName, email: user.email, phone: '' };
    const [bookingInfo, setBookingInfo] = useState(initialBookingInfo);

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newBookingInfo = { ...bookingInfo };
        newBookingInfo[field] = value;
        setBookingInfo(newBookingInfo);

    }

    const handleBookingSubmit = e => {
        //collect data
        const appointment = {
            ...bookingInfo,
            serviceName: name,
            time,
            price,
            date: date.toLocaleDateString()

        }
        //send to the server
        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingSuccess(true);
                    handleBookingClose();
                }
            })

       
        e.preventDefault();
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openBooking}
            onClose={handleBookingClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openBooking}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {name}
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        {time}
                    </Typography>
                    <form style={{ textAlign: "left" }} onSubmit={handleBookingSubmit}>
                        {/* <TextField
                            sx={{ width: "90%", m: 1 }}
                            id="outlined-size-small"
                            value={time}
                            size="small"
                        /> */}
                        <TextField
                            sx={{ width: "90%", m: 1 }}
                            id="outlined-size-small"
                            name="patientName"
                            onBlur={handleOnBlur}
                            defaultValue={user?.displayName}
                            size="small"
                        />
                        <TextField
                            sx={{ width: "90%", m: 1 }}
                            id="outlined-size-small"
                            name='email'
                            onBlur={handleOnBlur}
                            defaultValue={user?.email}
                            size="small"
                        />
                        <TextField
                            sx={{ width: "90%", m: 1 }}
                            id="outlined-size-small"
                            name='phone'
                            onBlur={handleOnBlur}
                            placeholder="Your Phone"
                            size="small"
                        />
                        <TextField

                            sx={{ width: "90%", m: 1 }}
                            id="outlined-size-small"
                            value={date.toDateString()}
                            size="small"
                        />
                        <Button type="submit" variant="contained" sx={{ ml: 1 }}>Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookingModal;