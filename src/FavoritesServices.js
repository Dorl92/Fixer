import React, { useState } from 'react';
//style
import styles from './styles/ServicesListStyles';
//components
import Layout from './Layout';
import Loader from 'react-loader-spinner';
import ServiceCard from './ServiceCard';
//contexts
import { useAuth } from './contexts/authContext';
import { useServicesContext } from './contexts/servicesContext';
//material-ui
import { withStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';


function FavoritesServices(props) {
    const { classes, history, editUser } = props;

    const { loggedUser } = useAuth();
    const { services, removeService } = useServicesContext();

    const fullServiceInfo = serviceId => {
        history.push(`/services/${serviceId}/info`);
    }

    return (
        <Layout>
            <div className={classes.container}>
                <h2 className={classes.title}>All Your Favorites Services</h2>
                <p className={classes.subtitle}>Take a time to remember your favorites services and to choose one that fit your needs</p>
                <Divider />
                <div className={classes.services}>
                    {services && services.map(service => loggedUser.favorites && loggedUser.favorites.includes(service.serviceId) ?
                        <ServiceCard
                            key={service.id}
                            serviceData={service}
                            editUser={editUser}
                            removeService={removeService}
                            fullServiceInfo={fullServiceInfo} /> : null)}
                </div>
            </div>
        </Layout>
    );
}

export default withStyles(styles)(FavoritesServices);
