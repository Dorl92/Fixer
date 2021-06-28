import React, { Fragment } from 'react';
import PurchaseService from './PurchaseService';
import { SortableContainer } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles';
import styles from './styles/UserDashboardStyles';

function UserDashboard(props) {
    const { classes, userPurchases, users, services, editPurchase } = props;
    let legned = new Map();
    if (userPurchases) {
        userPurchases.map(purchase => {
            let count = legned.get(purchase.serviceCategory)
            if (count === undefined) {
                legned.set(purchase.serviceCategory, 1)
            } else {
                legned.set(purchase.serviceCategory, count + 1)
            }
        })
    }
    const categories = [...legned.keys()].map((key) => {
        let categoryColor = null;
        switch (key) {
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
        return (
            <div className={classes.category}>
                <div style={{ backgroundColor: categoryColor }} className={classes.categoryCircle}>{legned.get(key)}</div>
                <div className={classes.categoryText}>{key}</div>
            </div>
        )
    })
    return (
        <Fragment>
            {userPurchases &&
                <div className={classes.root}>
                    <div className={classes.title}>Purchased Services</div>
                    <div className={classes.container}>
                        <div className={classes.legend}>
                            <div className={classes.category}>
                                <div style={{ backgroundColor: "#1F1E1E" }} className={classes.categoryCircle}>{userPurchases.length}</div>
                                <div className={classes.categoryText}>All</div>
                            </div>
                            {categories}
                        </div>
                        <div className={classes.purchases}>
                            {userPurchases.map((purchase, i) =>
                                <PurchaseService
                                    editPurchase={editPurchase}
                                    key={purchase.purchaseId}
                                    index={i}
                                    users={users}
                                    services={services}
                                    purchase={purchase}
                                    progressStage={purchase.progressStage}
                                    category={purchase.serviceCategory}
                                />
                            )}
                        </div>
                    </div>


                </div>
            }
        </Fragment>
    );
}

export default SortableContainer(withStyles(styles)(UserDashboard));