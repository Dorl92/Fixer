import React from 'react';
import PurchaseService from './PurchaseService';
import { SortableContainer } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles';
import styles from './styles/PurchaseServiceListStyles';

function PurchaseServiceList(props) {
    const { classes, userPurchases, users, services, editPurchase } = props;
    userPurchases.sort(function (a, b) {
        return a.index - b.index;
    })
    return (
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
    );
}

export default SortableContainer(withStyles(styles)(PurchaseServiceList));