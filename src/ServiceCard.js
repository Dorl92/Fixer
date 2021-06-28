import React, { Fragment, useEffect, useState } from 'react';
import { useAuth } from './contexts/authContext';
import { database } from "./firebase";

import { withRouter } from 'react-router-dom';
import useToggle from './hooks/useToggle';

import styles from './styles/ServiceCardStyles';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GradeIcon from '@material-ui/icons/Grade';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { red, blue } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Card(props) {
    const {
        classes,
        history,
        serviceData,
        editUser,
        purchases,
        removePurchase,
        addToFavoritesSnackbar,
        removeService,
        fullServiceInfo
    } = props;

    const { loggedUser } = useAuth();
    const [sellerData, setSellerData] = useState(null);
    let [currentImage, setCurrentImage] = useState(0);
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleRemoveService = () => {
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

    const nextImage = () => {
        if (currentImage >= 0 && currentImage < serviceData.images.length - 1) {
            setCurrentImage(currentImage + 1)
        } else {
            setCurrentImage(0)
        }
    }
    const previousImage = () => {
        if (currentImage > 0 && currentImage <= serviceData.images.length - 1) {
            setCurrentImage(currentImage - 1)
        } else {
            setCurrentImage(serviceData.images.length - 1)
        }
    }

    return (
        <Fragment>
            {serviceData && sellerData &&
                <div className={classes.card}>
                    <div className={classes.image}>
                        {loggedUser && loggedUser.userId === serviceData.sellerId &&
                            <div className={classes.more}>
                                <IconButton>
                                    <MoreVertIcon onClick={handleClick} />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose} >
                                    <MenuItem onClick={() => history.push(`/services/${serviceData.serviceId}/edit`)}>Edit</MenuItem>
                                    <MenuItem onClick={openDialogToggle}>Delete</MenuItem>
                                </Menu>
                            </div>
                        }
                        {serviceData.images && serviceData.images.map((image, index) => {
                            return (
                            <div className={index === currentImage ? classes.slideActive : classes.slide} key={index}>
                                {index === currentImage && (<img src={image} />)}
                            </div>
                            )
                        })}
                        <div className={classes.slideButtons}>
                            <div onClick={previousImage}><NavigateBeforeIcon style={{ transform: "scale(2)", color: "white" }} /></div>
                            <div onClick={nextImage}><NavigateNextIcon style={{ transform: "scale(2)", color: "white" }} /></div>
                        </div>
                    </div>
                    <div className={classes.supplierBar}>
                        <Avatar src={sellerData.photoUrl} onClick={() => history.push(`/user-info/${serviceData.sellerId}`)} className={classes.avatar} />
                        <div className={classes.supplierDetails}>
                            <div className={classes.supplierName}>
                                {sellerData.firstname} {sellerData.lastname}
                            </div>
                            <div className={classes.supplierTitle}>
                                {serviceData.category}
                            </div>
                        </div>
                    </div>
                    <div className={classes.description} onClick={() => fullServiceInfo(serviceData.serviceId)}>
                        {serviceData.description}
                    </div>
                    <div className={classes.score}>
                        <div style={{ color: "rgb(202, 178, 44)", display: "flex", alignItems: "center" }}>
                            <GradeIcon />{averageScore.toFixed(1)}
                        </div>
                        <div style={{ marginLeft: "0.2rem", color: "rgb(168, 167, 167)" }}>
                            ({serviceData.numReviews})
                        </div>

                    </div>
                    <Divider />
                    <footer className={classes.footer}>
                        {loggedUser ?
                            <IconButton onClick={handleFavorite}>
                                <FavoriteIcon style={{ color: loggedUser.favorites && loggedUser.favorites.includes(serviceData.serviceId) ? "red" : null }} />
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
                                        <CheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Delete" />
                            </ListItem>
                            <ListItem button onClick={openDialogToggle}>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: red[100], color: red[500] }}>
                                        <CloseIcon />
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
                anchorOrigin={{ vertical: "center", horizontal: "center" }}>
                <Alert onClose={handleSnackbarClose} severity="error">
                    Can't delete this service. please complete all previous purchases before!
                </Alert>
            </Snackbar>
        </Fragment>
    );
}

export default withRouter(withStyles(styles)(Card));