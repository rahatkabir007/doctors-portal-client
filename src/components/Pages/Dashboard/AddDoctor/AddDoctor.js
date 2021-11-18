import React, { useState } from 'react';
import { TextField, Input, Button } from '@mui/material';
const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = e => {
     
        e.preventDefault();
        if (!image) {
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('http://localhost:5000/doctors', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('doctor added');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    return (
        <div>
            <h1>Add Doctor</h1>
            <form onSubmit={handleSubmit}>
                <TextField onChange={e => setName(e.target.value)} id="standard-basic" label="Name" type= 'text' variant="standard" sx={{ width: '50%' }} required /><br />
                <TextField onChange={e => setEmail(e.target.value)} id="standard-basic" label="Email" type="email" variant="standard" sx={{ width: '50%' }} required /><br />

                <Input onChange={e => setImage(e.target.files[0])} accept="image/*" multiple type="file" /><br />
                <Button variant="contained" type='submit'>
                    Add Doctor
                </Button>

            </form>
        </div>
    );
};

export default AddDoctor;