import React, { Fragment } from 'react';
//contexts
import { useServicesContext } from './contexts/servicesContext';
import { useUsersContext } from './contexts/usersContext';
import { usePurchasesContext } from './contexts/purchasesContext';
//components
import ProgressBar from "@ramonak/react-progress-bar";
//style
import styles from './styles/SoldServiceStyles';
//material-ui
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { NavigateBefore, NavigateNext, Done } from '@material-ui/icons';


function SoldService(props) {
    const { classes, sale } = props;

    const { services } = useServicesContext();
    const { users } = useUsersContext();
    const { editPurchase } = usePurchasesContext();

    let barColor = null;
    let progress = 10;
    switch (sale.progressStage) {
        case 0:
            barColor = "#7AD30D";
            break;
        case 1:
            barColor = "#6FC00C";
            progress = 25;
            break;
        case 2:
            barColor = "#64AD0B";
            progress = 75;
            break;
        case 3:
            barColor = "#59990A";
            progress = 100;
            break;
    }

    let categoryColor = null;
    switch (sale.serviceCategory) {
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
    }

    const daysLeft = (end) => {
        const currentDate = new Date();
        const deliveryDate = new Date(end)
        const oneDay = 1000 * 60 * 60 * 24;
        const timeLeft = deliveryDate.getTime() - currentDate.getTime();
        const daysLeft = Math.round(timeLeft / oneDay);
        return daysLeft;
    }

    let numDaysColor = null;
    const numDays = daysLeft(sale.deliveryDate)
    console.log(numDays)
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
        console.log(sale)
        editPurchase({ ...sale, progressStage: sale.progressStage + 1 }, sale.purchaseId)
    }

    return (
        <Fragment>
            {serviceData &&
                <div className={classes.container}>
                    <div className={classes.buttonsHover}>
                        {sale.progressStage !== 0 ?
                            <Avatar onClick={previousProgressStage}><NavigateBefore style={{ transform: "scale(1.7)" }} /></Avatar>
                            : <div></div>
                        }
                        {sale.progressStage !== 3 ?
                            <Avatar onClick={nextProgressStage}><NavigateNext style={{ transform: "scale(1.7)" }} /></Avatar>
                            : <div></div>
                        }
                    </div>
                    <div style={{ backgroundColor: categoryColor }} className={classes.categoryColor}></div>
                    <div className={classes.sale}>
                        <div className={classes.header}>
                            <div className={classes.subcategory}>
                                <div style={{ backgroundColor: categoryColor }} className={classes.tab}>
                                    {serviceData.subcategory}
                                </div>
                            </div>
                            <div className={classes.delivery}>
                                {sale.progressStage === 3 ?
                                    <div style={{ border: "1px solid #349B25", color: "#349B25" }} className={classes.daysLeft}>
                                        <Done />
                                    </div>
                                    :
                                    <div style={{ color: `${numDaysColor}`, border: `1px solid ${numDaysColor}` }} className={classes.daysLeft}>
                                        {daysLeft(sale.deliveryDate)}
                                    </div>
                                }
                                <div style={{ textAlign: "center", fontSize: "10px", color: "#525252" }}>
                                    {sale.progressStage === 3 ?
                                        "Done"
                                        : "Days to delivery"
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={classes.username}>
                            Purchased by <strong>{userData.username}</strong>
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
                </div>
            }
        </Fragment>
    )
}

export default withStyles(styles)(SoldService);
