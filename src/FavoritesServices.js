import React, { useState } from 'react';
import Layout from './Layout';
import { useAuth } from './contexts/authContext';

import { withStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ServiceCard from './ServiceCard';
import styles from './styles/ServicesListStyles';

function FavoritesServices(props) {
    const { classes, history, services, removeService, editUser } = props;
    const { loggedUser } = useAuth();

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
