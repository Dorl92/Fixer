import React, { useState } from 'react';
import { useAuth } from './contexts/authContext';
import useInputState from './hooks/useInputState';
import { v4 as uuidv4 } from 'uuid';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NewPurchaseFormStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function NewPurchaseForm(props) {
    const { classes, serviceData, sellerData, addNewPurchase, openDialog, openDialogToggle, purchasesLength } = props;

    const { loggedUser } = useAuth();

    const [noteToSeller, changeNoteToSeller, resetNoteToSeller] = useInputState('');
    const [pricePlan, setPricePlan] = useState('basic');

    let basic = null
    let standard = null
    let premium = null

    if (serviceData) {
        basic = `Basic- ${serviceData.price}$ (30 Days Delivery)`
        standard = `Standard- ${(serviceData.price * 1.2).toFixed(1)}$ (21 Days Delivery)`
        premium = `Premium- ${(serviceData.price * 1.4).toFixed(1)}$ (14 Days Delivery)`
    }

    const handlePricePlanChange = (event) => {
        setPricePlan(event.target.value);
    };
    const addDays = (date, days) => {
        let result = new Date(date)
        result.setDate(date.getDate() + days);
        return result;
    }
    const formatDate = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        let plan = null;
        switch (pricePlan) {
            case 'basic':
                plan = {
                    planType: 'Basic',
                    price: (serviceData.price * 1).toFixed(1),
                    daysToDelivery: 30
                }
                break;
            case 'standard':
                plan = {
                    planType: 'Standard',
                    price: (serviceData.price * 1.2).toFixed(1),
                    daysToDelivery: 21
                }
                break;
            case 'premium':
                plan = {
                    planType: 'Premium',
                    price: (serviceData.price * 1.4).toFixed(1),
                    daysToDelivery: 14
                }
                break;
        }
        const purchaseDate = new Date();
        const deliveryDate = formatDate(addDays(purchaseDate, plan.daysToDelivery))
        const newPurchase = {
            purchaseId: uuidv4(),
            index: purchasesLength + 1,
            serviceId: serviceData.serviceId,
            sellerId: sellerData.userId,
            userId: loggedUser.userId,
            serviceCategory: serviceData.category,
            pricePlan: plan,
            note: noteToSeller,
            progressStage: 0,
            purchaseDate: formatDate(purchaseDate),
            deliveryDate: deliveryDate
        }
        addNewPurchase(newPurchase)
        openDialogToggle();
    }

    return (
        <Dialog open={openDialog} onClose={openDialogToggle} fullWidth>
            {serviceData && sellerData &&
                <section className={classes.root}>
                    <div className={classes.serviceName}>Purchase Service- <strong>{serviceData.title}</strong></div>
                    <div className={classes.sellerName}>Seller Name- <strong>{sellerData.username}</strong></div>
                    <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
                        <FormLabel style={{ fontFamily: "Nunito" }} component="legend">Select Price Plan</FormLabel>
                        <RadioGroup aria-label="pricePlan" name="pricePlan" value={pricePlan} onChange={handlePricePlanChange}>
                            <FormControlLabel value="basic" control={<Radio color="primary" />} label={basic} />
                            <FormControlLabel value="standard" control={<Radio color="primary" />} label={standard} />
                            <FormControlLabel value="premium" control={<Radio color="primary" />} label={premium} />
                        </RadioGroup>
                        <div className={classes.description}>
                            <label for="text">Add note to the seller</label>
                            <textarea
                                id="text"
                                cols="20"
                                rows="3"
                                onChange={changeNoteToSeller}
                                value={noteToSeller}
                            >
                            </textarea>
                        </div>
                        <div className={classes.button}>
                            <Button
                                variant="contained"
                                style={{ width: "60%", backgroundColor: "#23775a", color: "white" }}
                                type="submit">
                                Complete Purchase
                            </Button>
                        </div>
                    </ValidatorForm>
                </section>
            }
        </Dialog>
    );
};

export default withStyles(styles)(NewPurchaseForm);




