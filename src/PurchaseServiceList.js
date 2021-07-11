import React from 'react';
//components
import PurchaseService from './PurchaseService';
import { SortableContainer } from 'react-sortable-hoc';
//style
import styles from './styles/PurchaseServiceListStyles';
//material-ui
import { withStyles } from '@material-ui/styles';

function PurchaseServiceList(props) {
    const { classes, userPurchases } = props;
    userPurchases.sort(function (a, b) {
        return a.index - b.index;
    })
    return (
        <div className={classes.purchases}>
            {userPurchases.map((purchase, i) =>
                <PurchaseService
                    purchase={purchase}
                    key={purchase.purchaseId}
                    index={i}
                />
            )}
        </div>
    );
}

export default SortableContainer(withStyles(styles)(PurchaseServiceList));