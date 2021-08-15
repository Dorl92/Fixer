import React, { Fragment, useEffect, useState } from 'react';
import { database } from "./firebase";
import { withRouter } from 'react-router-dom';
//contexts
import { useAuth } from './contexts/authContext';
import { useUsersContext } from './contexts/usersContext';
import { useServicesContext } from './contexts/servicesContext';
import { usePurchasesContext } from './contexts/purchasesContext';
//hooks
import useToggle from './hooks/useToggle';
//style
import styles from './styles/ServiceCardStyles';
//material-ui
import { withStyles } from '@material-ui/styles';
import { Avatar, Snackbar, Divider, IconButton, Dialog, DialogTitle, Menu, MenuItem, List, ListItemText, ListItemAvatar, ListItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Favorite, MoreVert, Grade, Close, Check, NavigateBefore, NavigateNext } from '@material-ui/icons';
import { red, blue } from '@material-ui/core/colors';

function Card(props) {
    const {
        classes,
        history,
        serviceData,
        addToFavoritesSnackbar,
        fullServiceInfo
    } = props;

    const { loggedUser } = useAuth();
    const { editUser } = useUsersContext();
    const { removeService } = useServicesContext();
    const { purchases, removePurchase } = usePurchasesContext([]);

    const [sellerData, setSellerData] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (serviceData) {
            database.ref('users/' + serviceData.sellerId)
                .on('value', (snapshot) => {
                    const data = snapshot.val();
                    setSellerData(data)

                })
        }
    }, [])

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, openDialogToggle] = useToggle(false);

    let averageScore = 0;
    if (serviceData && serviceData.numReviews !== 0) {
        averageScore = serviceData.totalScore / serviceData.numReviews;
    }

    const handleClick = evt => {
        evt.stopPropagation();
        setAnchorEl(evt.currentTarget);
    }

    const handleClose = evt => {
        evt.stopPropagation();
        setAnchorEl(null);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    const handleRemoveService = evt => {
        evt.stopPropagation();
        if (purchases && purchases.find(purchase => purchase.serviceId === serviceData.serviceId && purchase.progressStage !== 3)) {
            setOpenSnackbar(true)
            setAnchorEl(null)
            openDialogToggle()
        } else {
            purchases && purchases.map(purchase => purchase.serviceId === serviceData.serviceId && removePurchase(purchase.purchaseId))
            removeService(serviceData.serviceId)
        }
    }

    const handleFavorite = evt => {
        evt.stopPropagation();
        const updatedFavorites = loggedUser.favorites ? [...loggedUser.favorites] : []
        if (updatedFavorites.includes(serviceData.serviceId)) {
            const index = updatedFavorites.indexOf(serviceData.serviceId)
            updatedFavorites.splice(index, 1)
        } else {
            updatedFavorites.push(serviceData.serviceId)
            addToFavoritesSnackbar();
        }
        const updatedUser = {
            ...loggedUser,
            favorites: updatedFavorites
        }
        editUser(updatedUser, loggedUser.userId)
    }

    const nextImage = evt => {
        evt.stopPropagation();
        if (currentImage >= 0 && currentImage < serviceData.images.length - 1) {
            setCurrentImage(currentImage + 1)
        } else {
            setCurrentImage(0)
        }
    }
    const previousImage = evt => {
        evt.stopPropagation();
        if (currentImage > 0 && currentImage <= serviceData.images.length - 1) {
            setCurrentImage(currentImage - 1)
        } else {
            setCurrentImage(serviceData.images.length - 1)
        }
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Fragment>
            {serviceData && sellerData &&
                <div className={classes.card}>
                    <div className={classes.image} onClick={() => fullServiceInfo(serviceData.serviceId)}>
                        {loggedUser && loggedUser.userId === serviceData.sellerId &&
                            <div className={classes.options}>
                                <IconButton onClick={handleClick}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose} >
                                    <MenuItem onClick={evt => {
                                        evt.stopPropagation();
                                        history.push(`/services/${serviceData.serviceId}/edit`)
                                    }}>
                                        Edit
                                    </MenuItem>
                                    <MenuItem onClick={evt => {
                                        evt.stopPropagation();
                                        openDialogToggle()
                                    }}>
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </div>
                        }
                        {serviceData.images && serviceData.images.map((image, index) => {
                            return (
                                <div className={index === currentImage ? classes.slideActive : classes.slide} key={index}>
                                    {index === currentImage && (<img src={image} alt="service-img" />)}
                                </div>
                            )
                        })}
                        <div className={classes.slideButtons}>
                            <div onClick={previousImage}><NavigateBefore /></div>
                            <div onClick={nextImage}><NavigateNext /></div>
                        </div>
                    </div>
                    <div className={classes.sellerBar}>
                        <Avatar src={sellerData.photoUrl} onClick={() => history.push(`/user-info/${serviceData.sellerId}`)} className={classes.avatar} />
                        <div onClick={() => history.push(`/user-info/${serviceData.sellerId}`)}>
                            <div className={classes.sellerName}>
                                {sellerData.firstname} {sellerData.lastname}
                            </div>
                            <div className={classes.serviceTitle}>
                                {serviceData.category}
                            </div>
                        </div>
                    </div>
                    <div className={classes.description} onClick={() => fullServiceInfo(serviceData.serviceId)}>
                        {serviceData.description}
                    </div>
                    <div className={classes.score}>
                        <div style={{ color: "rgb(202, 178, 44)", display: "flex", alignItems: "center" }}>
                            <Grade />{averageScore.toFixed(1)}
                        </div>
                        <div style={{ marginLeft: "0.2rem", color: "rgb(168, 167, 167)" }}>
                            ({serviceData.numReviews})
                        </div>

                    </div>
                    <Divider />
                    <footer className={classes.footer} onClick={() => fullServiceInfo(serviceData.serviceId)}>
                        {loggedUser ?
                            <IconButton onClick={handleFavorite}>
                                <Favorite style={{ color: loggedUser.favorites && loggedUser.favorites.includes(serviceData.serviceId) ? "red" : null }} />
                            </IconButton>
                            : <div></div>}
                        <span className={classes.price}>STARTING AT <strong>${`${serviceData.price}`}</strong></span>
                    </footer>
                    <Dialog open={openDialog} onClose={openDialogToggle}>
                        <DialogTitle>Delete This Service?</DialogTitle>
                        <List>
                            <ListItem button onClick={handleRemoveService}>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: blue[100], color: blue[500] }}>
                                        <Check />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Delete" />
                            </ListItem>
                            <ListItem button onClick={openDialogToggle}>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: red[100], color: red[500] }}>
                                        <Close />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Cancel" />
                            </ListItem>
                        </List>
                    </Dialog>
                </div>
            }
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    Can't delete this service. please complete all previous purchases before!
                </Alert>
            </Snackbar>
        </Fragment>
    );
}

export default withRouter(withStyles(styles)(Card));