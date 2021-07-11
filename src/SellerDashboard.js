import React, { Fragment } from 'react';
//components
import SoldService from './SoldService';
//style
import styles from './styles/SellerDashboardStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//material-ui
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

function SellerDashboard(props) {
    const { classes, sellerSales } = props;
    return (
        <Fragment>
            {sellerSales &&
                <div className={classes.root}>
                    <div className={classes.title}>Sold Services</div>
                    <div className={classes.subtitle}>Move service forward / backward according to your progress</div>
                    <Divider style={{ marginBottom: "2rem" }} />
                    <div className={classes.container}>
                        <TransitionGroup className={classes.stageContainer}>
                            <div className={classes.stageTitle}>Not Started</div>
                            <div className={classes.solds}>
                                {sellerSales.map(sale => {
                                    if (sale.progressStage === 0) {
                                        return <CSSTransition key={sale.purchaseId} timeout={300} classNames="fade">
                                            <SoldService sale={sale} />
                                        </CSSTransition>
                                    }
                                }
                                )}
                            </div>
                        </TransitionGroup>
                        <TransitionGroup className={classes.stageContainer}>
                            <div className={classes.stageTitle}>In Progress</div>
                            {sellerSales.map(sale => {
                                if (sale.progressStage === 1) {
                                    return <CSSTransition key={sale.purchaseId} timeout={300} classNames="fade">
                                        <SoldService sale={sale} />
                                    </CSSTransition>
                                }
                            }
                            )}
                        </TransitionGroup>
                        <TransitionGroup className={classes.stageContainer}>
                            <div className={classes.stageTitle}>Almost Complete</div>
                            {sellerSales.map(sale => {
                                if (sale.progressStage === 2) {
                                    return <CSSTransition key={sale.purchaseId} timeout={300} classNames="fade">
                                        <SoldService sale={sale} />
                                    </CSSTransition>
                                }
                            }
                            )}
                        </TransitionGroup>
                        <TransitionGroup className={classes.stageContainer}>
                            <div className={classes.stageTitle}>Completed</div>
                            {sellerSales.map(sale => {
                                if (sale.progressStage === 3) {
                                    return <CSSTransition key={sale.purchaseId} timeout={300} classNames="fade">
                                        <SoldService sale={sale} />
                                    </CSSTransition>
                                }
                            }
                            )}
                        </TransitionGroup>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default withStyles(styles)(SellerDashboard);