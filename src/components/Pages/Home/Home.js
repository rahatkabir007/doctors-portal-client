import React from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import Services from '../Services/Services';
import Navigation from '../Shared/Navigation/Navigation';
import Banner from './Banner/Banner';
import Doctors from './Doctors/Doctors';

const Home = () => {
    return (
        <div>
            <Navigation></Navigation>
            <Banner></Banner>
            <Services></Services>
            <AppointmentBanner></AppointmentBanner>
            <Doctors></Doctors>
        </div>
    );
};

export default Home;