import React, { useEffect, useState } from 'react';
import { database } from "./firebase";
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import ServiceCard from './ServiceCard';
import styles from './styles/ServicesListStyles';
import Layout from './Layout';
import { Divider } from '@material-ui/core';

function ServicesList(props) {
    const { classes, history, category, removeService, editUser, purchases, removePurchase } = props;
    const [services, setServices] = useState(null)
    const [isSnackbar, setSnackbar] = useState(false);

    useEffect(() => {
        database.ref('services/')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setServices(data && Object.values(data))
            })
    }, [])

    const addToFavoritesSnackbar = () => {
        setSnackbar(!isSnackbar);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(false);
    };
    const fullServiceInfo = serviceId => {
        history.push(`/services/${serviceId}/info`);
    }

    return (
        <Layout>
            <div className={classes.container}>
                <h2 className={classes.title}>{category ? `Search results for: ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}` : 'All Our Services'}</h2>
                <p className={classes.subtitle}>Take a time to look after all our services. Choose one that fit you the best.</p>
                <Divider />
                {services ?
                    <TransitionGroup className={classes.services}>
                        {category ? services.map(service => {
                            if ((service.category.toLowerCase() === category) || (service.subcategory.toLowerCase() === category)) {
                                return (
                                    <CSSTransition key={service.serviceId} timeout={300} classNames="fade">
                                        <ServiceCard
                                            key={service.serviceId}
                                            serviceData={service}
                                            removeService={removeService}
                                            purchases={purchases}
                                            removePurchase={removePurchase}
                                            editUser={editUser}
                                            addToFavoritesSnackbar={addToFavoritesSnackbar}
                                            fullServiceInfo={fullServiceInfo} />
                                    </CSSTransition>
                                )
                            }
                        }) :
                            services.map(service => (
                                <CSSTransition key={service.serviceId} timeout={300} classNames="fade">
                                    <ServiceCard
                                        key={service.serviceId}
                                        serviceData={service}
                                        removeService={removeService}
                                        purchases={purchases}
                                        removePurchase={removePurchase}
                                        editUser={editUser}
                                        addToFavoritesSnackbar={addToFavoritesSnackbar}
                                        fullServiceInfo={fullServiceInfo} />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                    :
                    <div className={classes.spinner}>
                        <Loader
                            type="TailSpin"
                            color="#29bb89"
                            height={100}
                            width={100}
                            timeout={10000} //3 secs
                        />
                    </div>
                }
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={isSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
                message="Added service to favorites"
                action={
                    <IconButton aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
                        <CloseIcon />
                    </IconButton>
                }
            />
        </Layout>
    );
}

export default withStyles(styles)(ServicesList);




