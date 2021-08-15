import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
//contexts
import { useServicesContext } from './contexts/servicesContext';
import { useUsersContext } from './contexts/usersContext';
//style
import 'react-circular-progressbar/dist/styles.css';
import styles from './styles/PurchaseServiceStyles';
//components
import { SortableElement } from 'react-sortable-hoc';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
//material-ui
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';

function PurchaseService(props) {
    const { history, classes, purchase } = props;

    const { services } = useServicesContext();
    const { users } = useUsersContext();


    let progress = 10;
    switch (purchase.progressStage) {
        case 0:
            break;
        case 1:
            progress = 25;
            break;
        case 2:
            progress = 75;
            break;
        case 3:
            progress = 100;
            break;
        default:
            progress = 10;
    }

    let categoryColor;
    switch (purchase.serviceCategory) {
        case 'Graphics & Design':
            categoryColor = "#A22E2E";
            break;
        case 'Digital Marketing':
            categoryColor = "#686490";
            break;
        case 'Writing & Translation':
            categoryColor = "#2659A6";
            break;
        case 'Video & Animation':
            categoryColor = "#D1C410";
            break;
        case 'Music & Audio':
            categoryColor = "#13A429";
            break;
        case 'Programming & Tech':
            categoryColor = "#BD7A23";
            break;
        default:
            categoryColor = "black"
    }

    let serviceData = null;
    if (services && purchase) {
        serviceData = services.find(service => service.serviceId === purchase.serviceId);
    }

    let sellerData = null;
    if (users && purchase) {
        sellerData = users.find(user => user.userId === purchase.sellerId)
    }

    const delivery = new Date(purchase.deliveryDate);

    return (
        <Fragment>
            {serviceData && sellerData &&
                <div className={classes.container}>
                    <div style={{ backgroundColor: categoryColor }} className={classes.categoryColor}></div>
                    <div className={classes.title}>{serviceData.title}</div>
                    <div className={classes.subcategory}>
                        <div style={{ backgroundColor: categoryColor }} className={classes.tab}>{serviceData.subcategory}</div>
                    </div>
                    <Avatar src={sellerData.photoUrl} className={classes.sellerImage} onClick={() => history.push(`/user-info/${serviceData.sellerId}`)} />
                    <div className={classes.deliveryDate}>{delivery.toUTCString().slice(0, 16)}</div>
                    <div className={classes.progress}>
                        <CircularProgressbar
                            className={classes.circle}
                            value={progress}
                            text={`${progress}%`}
                            styles={buildStyles({
                                pathColor: "green",
                                textColor: "green",
                                textSize: "25px"
                            })} />
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default SortableElement(withRouter(withStyles(styles)(PurchaseService)));
