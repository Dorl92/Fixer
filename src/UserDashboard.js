import React, { Fragment } from 'react';
import PurchaseService from './PurchaseService';
import { SortableContainer } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles';
import styles from './styles/UserDashboardStyles';

function UserDashboard(props) {
    const { classes, userPurchases, users, services, editPurchase } = props;
    
    return (
        <Fragment>
            {userPurchases && 
                <div className={classes.root}>
                    <div className={classes.title}>Purchased Services</div>
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
                            />
                        )}
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default SortableContainer(withStyles(styles)(UserDashboard));