import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import ProgressBar from "@ramonak/react-progress-bar";
import styles from './styles/PurchaseServiceStyles';

function PurchaseService(props) {
    const { classes, purchase, progressStage, services, users } = props;

    let barColor = null;
    let progress = 10;
    switch (progressStage) {
        case 0:
            barColor = "#ade8f4";
            break;
        case 1:
            barColor = "#90e0ef";
            progress = 25;
            break;
        case 2:
            barColor = "#00b4d8";
            progress = 75;
            break;
        case 3:
            barColor = "#0077b6";
            progress = 100;
            break;
    }

    let serviceData = null;
    if (services && purchase) {
        serviceData = services.find(service => service.serviceId === purchase.serviceId);
    }

    let sellerData = null;
    if (users && purchase) {
        sellerData = users.find(user => user.userId === purchase.sellerId)
    }

    return (
        <div className={classes.purchaseContainer}>
            {serviceData &&
                <Fragment>
                    <div className={classes.purchaseImage}>
                        <img src={serviceData.images[0]} />
                    </div>
                    <div className={classes.purchaseDetails}>
                        <div className={classes.purchaseHeader}>
                            <div className={classes.purchaseTitle}>
                                {serviceData.title}
                            </div>
                            <div className={classes.purchaseServiceType}>
                                {serviceData.serviceType}
                            </div>
                        </div>
                        <div className={classes.purchaseFooter}>
                            <div>
                                Delivery date: <strong>{purchase.deliveryDate}</strong>
                            </div>
                            <div className={classes.progress}>
                                Progress (by <strong>{sellerData.username})</strong>
                            </div>
                            <div className={classes.completionBar}>
                                <ProgressBar
                                    completed={progress}
                                    labelAlignment="center"
                                    labelColor="#f8f9fa"
                                    height="15px"
                                    labelSize="10px"
                                    bgColor={barColor}
                                />
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </div>

    );
}

export default withStyles(styles)(PurchaseService);