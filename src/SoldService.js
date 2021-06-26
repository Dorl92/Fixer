import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/SoldServiceStyles';
// import { SortableElement } from 'react-sortable-hoc';
import ProgressBar from "@ramonak/react-progress-bar";
import Avatar from '@material-ui/core/Avatar';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DoneIcon from '@material-ui/icons/Done';

function SoldService(props) {
    const { classes, services, users, sale, progressStage, editPurchase } = props;

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

    let numDaysColor = null;
    const numDays = sale && parseInt(sale.pricePlan.daysToDelivery)
    switch (true) {
        case (numDays >= 0 && numDays < 3):
            numDaysColor = "#C42513";
            break;
        case (numDays >= 3 && numDays < 7):
            numDaysColor = "#C83E17";
            break;
        case (numDays >= 7 && numDays < 10):
            numDaysColor = "#E37F2D";
            break;
        case (numDays >= 10 && numDays < 14):
            numDaysColor = "#E3AA2D";
            break;
        case (numDays >= 14 && numDays < 17):
            numDaysColor = "#E3D42D";
            break;
        case (numDays >= 17 && numDays < 22):
            numDaysColor = "#A8D130";
            break;
        case (numDays >= 22 && numDays < 26):
            numDaysColor = "#50CB33";
            break;
        case (numDays >= 26 && numDays < 31):
            numDaysColor = "#339312";
            break;
    }


    const daysLeft = (end) => {
        const currentDate = new Date();
        const deliveryDate = new Date(end)
        const oneDay = 1000 * 60 * 60 * 24;
        const timeLeft = deliveryDate.getTime() - currentDate.getTime();
        const daysLeft = Math.round(timeLeft / oneDay);
        return daysLeft;
    }

    let serviceData = null;
    if (services && sale) {
        serviceData = services.find(service => service.serviceId === sale.serviceId);
    }

    let userData = null;
    if (users && sale) {
        userData = users.find(user => user.userId === sale.userId)
    }

    const previousProgressStage = () => {
        editPurchase({ ...sale, progressStage: sale.progressStage - 1 }, sale.purchaseId)

    }
    const nextProgressStage = () => {
        editPurchase({ ...sale, progressStage: sale.progressStage + 1 }, sale.purchaseId)
    }

    return (
        <div className={classes.saleContainer}>
            {serviceData &&
                <Fragment>
                    <div className={classes.buttonsHover}>
                        {sale.progressStage !== 0 ?
                            <Avatar onClick={previousProgressStage}><NavigateBeforeIcon style={{ transform: "scale(1.7)" }} /></Avatar>
                            : <div></div>
                        }
                        {sale.progressStage !== 3 ?
                            <Avatar onClick={nextProgressStage}><NavigateNextIcon style={{ transform: "scale(1.7)" }} /></Avatar>
                            : <div></div>
                        }
                    </div>
                    <div className={classes.saleHeader}>
                        <div>
                            <div className={classes.saleTitle}>
                                {serviceData.title}
                            </div>
                            <div className={classes.saleServiceType}>
                                {serviceData.serviceType}
                            </div>
                        </div>
                        <div className={classes.saleDelivery}>
                            {sale.progressStage === 3 ?
                                <div style={{ border: "1px solid #349B25", color: "#349B25" }} className={classes.saleDays}>
                                    <DoneIcon />
                                </div>
                                :
                                <div style={{ color: `${numDaysColor}`, border: `1px solid ${numDaysColor}` }} className={classes.saleDays}>
                                    {daysLeft(sale.deliveryDate)}
                                </div>
                            }
                            <div style={{ fontSize: "10px", color: "#525252" }}>
                                {sale.progressStage === 3 ?
                                    "Done"
                                    : "Days to delivery"
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={classes.saleDetails}>
                            <div className={classes.salePurchasedUser}>
                                Purchased by: {userData.username}
                            </div>
                        </div>
                        <div className={classes.completionBar}>
                            <ProgressBar
                                completed={progress}
                                labelAlignment="center"
                                labelColor="#f8f9fa"
                                height="15px"
                                labelSize="10px"
                                bgColor={barColor} />
                        </div>
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default withStyles(styles)(SoldService);