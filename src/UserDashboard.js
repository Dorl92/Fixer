import React, { Fragment } from 'react';
//components
import PurchaseServiceList from './PurchaseServiceList';
//style
import styles from './styles/UserDashboardStyles';
//material-ui
import { withStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';

function UserDashboard(props) {
    const { classes, userPurchases, onSortEnd } = props;
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
    const categories = [...legned.keys()].sort()
    const sortedCategories = categories.map((key) => {
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
                    <div className={classes.subtitle}>Drag & drop any purchase to arrange your purchases list</div>
                    <Divider style={{ marginBottom: "2rem" }} />
                    <div className={classes.container}>
                        <div className={classes.legend}>
                            <div className={classes.category}>
                                <div style={{ backgroundColor: "#1F1E1E" }} className={classes.categoryCircle}>{userPurchases.length}</div>
                                <div className={classes.categoryText}>All</div>
                            </div>
                            {sortedCategories}
                        </div>
                        <PurchaseServiceList
                            axis='y'
                            distance={20}
                            onSortEnd={onSortEnd}
                            userPurchases={userPurchases}
                        />
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default withStyles(styles)(UserDashboard);