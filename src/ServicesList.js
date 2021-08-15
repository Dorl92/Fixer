import React, { useState } from 'react';
//components
import ServiceCard from './ServiceCard';
import Layout from './Layout';
import Loader from 'react-loader-spinner';
//style
import styles from './styles/ServicesListStyles';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//material-ui
import { Snackbar, IconButton, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
//contexts
import { useServicesContext } from './contexts/servicesContext';

function ServicesList(props) {
    const { classes, history, category } = props;

    const { services } = useServicesContext();

    const [isSnackbar, setSnackbar] = useState(false);

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
    const availableServicesCount = () => {
        if (!category) return services.length;
        let count = 0;
        services.forEach(service => {
            if ((service.category.toLowerCase() === category) || (service.subcategory.toLowerCase() === category)) count++;
        })
        return count;
    }

    return (
        <Layout>
            <div className={classes.container}>
                <h2 className={classes.title}>{category ? `Search results for: ${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}` : 'All Our Services'}</h2>
                <p className={classes.subtitle}>Take a time to look after all our services. Choose one that fit you the best.</p>
                <Divider />
                <h4>{availableServicesCount()} services available</h4>
                {services ?
                    <TransitionGroup className={classes.services}>
                        {category ? services.map(service => {
                            if ((service.category.toLowerCase() === category) || (service.subcategory.toLowerCase() === category)) {
                                return (
                                    <CSSTransition key={service.serviceId} timeout={300} classNames="fade">
                                        <ServiceCard
                                            serviceData={service}
                                            addToFavoritesSnackbar={addToFavoritesSnackbar}
                                            fullServiceInfo={fullServiceInfo} />
                                    </CSSTransition>
                                )
                            } else {
                                return null;
                            }
                        }) :
                            services.map(service => (
                                <CSSTransition key={service.serviceId} timeout={300} classNames="fade">
                                    <ServiceCard
                                        serviceData={service}
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
                            timeout={10000}
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




