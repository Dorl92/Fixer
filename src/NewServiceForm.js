import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/authContext';
import useInputState from './hooks/useInputState';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NewServiceFormStyles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { v4 as uuidv4 } from 'uuid';

import Layout from './Layout';
import { Fragment } from 'react';

function NewServiceForm(props) {
    const { classes, history, addNewService } = props;

    const { loggedUser } = useAuth();

    const [serviceType, changeServiceType, resetServiceType] = useInputState("");
    const [title, changeTitle, resetTitle] = useInputState("");
    const [description, changeDescription, resetdescription] = useInputState("");
    const [price, changePrice, resetPrice] = useInputState("");
    const [images, setImages] = useState([]);

    const [isImages, setIsImages] = useState(false);
    const [isDescription, setIsDescription] = useState(false);

    const [loadingUploadImage, setLoadingUploadImage] = useState(false);

    const serviceTypeList = ["Graphics & Design", "Digital Marketing", " Writing & Translation", "Video & Animation", "Music & Audio", " Programming & Tech"];

    useEffect(() => {
        ValidatorForm.addValidationRule('isPricePositive', (value) =>
            value > 0)
    }, [price])

    const handleUploadImages = async (evt) => {
        const uploadImages = []
        for (let i = 0; i < evt.target.files.length; i++) {
            const imageFile = evt.target.files[i];
            const formData = new FormData();
            formData.append("upload_preset", "fixer_app");
            formData.append("file", imageFile);
            setLoadingUploadImage(true)
            await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
                .then(res => {
                    uploadImages.push(res.data.secure_url)
                })
                .catch(err => console.log(err));
        }
        setImages(uploadImages)
        setLoadingUploadImage(false)
    }

    const handleDeleteImage = (imageToRemove) => {
        const filteredImages = images.filter(image => imageToRemove !== image)
        setImages(filteredImages)
    }

    const submitNewService = evt => {
        evt.preventDefault();
        if (description === '') {
            setIsDescription(true)
            return;
        } else {
            setIsDescription(false)
        }
        if (images.length <= 1) {
            setIsImages(true)
            return;
        } else {
            setIsImages(false)
        }
        const newService = {
            serviceId: uuidv4(),
            serviceType,
            category: serviceType.toLowerCase().replace(/ /i, '-'),
            title,
            description,
            price,
            images: images,
            totalScore: 0,
            numReviews: 0,
            sellerId: loggedUser.userId
        }
        addNewService(newService);
        resetServiceType();
        resetTitle();
        resetdescription();
        resetPrice();
        history.push('/services');
    };

    return (
        <Layout>
            <section className={classes.root}>
                <h2>Add New Service</h2>
                <p>Please add some details for your service</p>
                <Divider />
                <ValidatorForm onSubmit={submitNewService} className={classes.form}>
                    <TextValidator
                        value={title}
                        onChange={changeTitle}
                        type="text"
                        margin="normal"
                        label="Enter title for your service"
                        validators={['required']}
                        errorMessages={['Title is required']} />
                    <FormControl style={{ width: "100%" }}>
                        <TextValidator
                            select
                            id="selectService"
                            label="Select service"
                            value={serviceType}
                            onChange={changeServiceType}
                            validators={['required']}
                            errorMessages={['Select service type']} >
                            {serviceTypeList.map(typeItem => <MenuItem value={typeItem}>{typeItem}</MenuItem>)}
                        </TextValidator>
                    </FormControl>
                    <TextValidator
                        value={price}
                        onChange={changePrice}
                        type="number"
                        size="medium"
                        margin="normal"
                        label="Set start price ($)"
                        validators={['required', 'isPricePositive']}
                        errorMessages={['Starting price is required', 'Price must be bigger then 0']} />
                    <div className={classes.description}>
                        <label for="text">Add a Short Description</label>
                        <textarea
                            id="text"
                            cols="20"
                            rows="4"
                            onChange={changeDescription}
                            value={description}>
                        </textarea>
                        {isDescription ? <div className={classes.validationError}>Description is required</div> : null}
                    </div>
                    <input
                        multiple
                        id="file"
                        type="file"
                        name="file"
                        className={classes.inputImage}
                        onChange={handleUploadImages} />
                    <label className={classes.inputImageLabel} htmlFor="file">Add Some Images</label>
                    {isImages ? <div className={classes.validationError}>Please add at least 2 images</div> : null}
                    <Fragment>
                        {loadingUploadImage ?
                            <div className={classes.spinner}>
                                <Loader
                                    type="TailSpin"
                                    color="#23775a"
                                    height={60}
                                    width={60}
                                    timeout={10000}
                                />
                            </div> :
                            <Fragment>
                                {images &&
                                    <div className={classes.imagesContainer}>
                                        {images.map(image => (
                                            <div className={classes.image}>
                                                <img src={image} />
                                                <section className={classes.deleteImageIcon} onClick={() => handleDeleteImage(image)} >
                                                    <DeleteIcon />
                                                </section>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </Fragment>
                        }
                    </Fragment>
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            style={{ width: "80%", backgroundColor: "#23775a", color: "white" }}
                            type="submit">
                            Add Service
                        </Button>
                    </div>
                </ValidatorForm>
            </section>
        </Layout>
    );
}

export default withStyles(styles)(NewServiceForm);
