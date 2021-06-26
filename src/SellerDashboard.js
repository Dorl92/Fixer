import React, { Fragment } from 'react';
import SoldService from './SoldService';
// import { SortableContainer } from 'react-sortable-hoc';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { withStyles } from '@material-ui/styles';
import styles from './styles/SellerDashboardStyles';

function SellerDashboard(props) {
    const { classes, sellerSales, users, services, editPurchase } = props;
    return (
        <Fragment>
            {sellerSales &&
                <div className={classes.root}>
                    <TransitionGroup className={classes.stageContainer}>
                        <div className={classes.stageTitle}>Not Started</div>
                        {sellerSales.map((sale, i) => {
                            if (sale.progressStage === 0) {
                                return <CSSTransition key={i} timeout={300} classNames="fade">
                                    <SoldService
                                        editPurchase={editPurchase}
                                        key={sale.purchaseId}
                                        index={i}
                                        users={users}
                                        services={services}
                                        sale={sale}
                                        progressStage={sale.progressStage}
                                    />
                                </CSSTransition>
                            }
                        }
                        )}
                    </TransitionGroup>
                    <TransitionGroup className={classes.stageContainer}>
                        <div className={classes.stageTitle}>In Progress</div>
                        {sellerSales.map((sale, i) => {
                            if (sale.progressStage === 1) {
                                return <CSSTransition key={i} timeout={300} classNames="fade">
                                    <SoldService
                                        editPurchase={editPurchase}
                                        key={sale.purchaseId}
                                        index={i}
                                        users={users}
                                        services={services}
                                        sale={sale}
                                        progressStage={sale.progressStage}
                                    />
                                </CSSTransition>
                            }
                        }
                        )}
                    </TransitionGroup>
                    <TransitionGroup className={classes.stageContainer}>
                        <div className={classes.stageTitle}>Almost Complete</div>
                        {sellerSales.map((sale, i) => {
                            if (sale.progressStage === 2) {
                                return <CSSTransition key={i} timeout={300} classNames="fade">
                                    <SoldService
                                        editPurchase={editPurchase}
                                        key={sale.purchaseId}
                                        index={i}
                                        users={users}
                                        services={services}
                                        sale={sale}
                                        progressStage={sale.progressStage}
                                    />
                                </CSSTransition>
                            }
                        }
                        )}
                    </TransitionGroup>
                    <TransitionGroup className={classes.stageContainer}>
                        <div className={classes.stageTitle}>Completed</div>
                        {sellerSales.map((sale, i) => {
                            if (sale.progressStage === 3) {
                                return <CSSTransition key={i} timeout={300} classNames="fade">
                                    <SoldService
                                        editPurchase={editPurchase}
                                        key={sale.purchaseId}
                                        index={i}
                                        users={users}
                                        services={services}
                                        sale={sale}
                                        progressStage={sale.progressStage}
                                    />
                                </CSSTransition>
                            }
                        }
                        )}
                    </TransitionGroup>
                </div>
            }
        </Fragment>
    );
}

export default withStyles(styles)(SellerDashboard);