import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { SERVICE_CATEGORIS_LIST, SERVICE_SUBCATEGORIS_LIST } from './utils/constants';
//components
import Loader from 'react-loader-spinner';
import Layout from './Layout';
//style
import styles from './styles/NewServiceFormStyles';
//contexts
import { useAuth } from './contexts/authContext';
import { useServicesContext } from './contexts/servicesContext';
//hooks
import useInputState from './hooks/useInputState';
//material-ui
import { withStyles } from '@material-ui/styles';
import { MenuItem, Button, FormControl, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function NewServiceForm(props) {
    const { classes, history } = props;
    
    const { loggedUser } = useAuth();
    const { addNewService } = useServicesContext(); 

    const [category, changeCategory, resetCategory] = useInputState("");
    const [subcategory, changeSubcategory, resetSubcategory] = useInputState("");
    const [title, changeTitle, resetTitle] = useInputState("");
    const [description, changeDescription, resetDescription] = useInputState("");
    const [price, changePrice, resetPrice] = useInputState("");
    const [images, setImages] = useState([]);
    
    const [isImages, setIsImages] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const [loadingUploadImage, setLoadingUploadImage] = useState(false);

    useEffect(() => {
        ValidatorForm.addValidationRule('isPricePositive', (value) =>
            value > 0)
    }, [price])

    const handleUploadImages = async (evt) => {
        const uploadImages = [];
        let files = evt.target.files;
        for (let i = 0; i < files.length; i++) {
            const imageFile = files[i];
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
            category,
            subcategory,
            title,
            description,
            price,
            images: images,
            totalScore: 0,
            numReviews: 0,
            sellerId: loggedUser.userId,
        }
        addNewService(newService);
        resetCategory();
        resetSubcategory();
        resetTitle();
        resetDescription();
        resetPrice();
        history.push('/services');
    };

    return (
        <Layout>
            <section className={classes.root}>
                <div className={classes.header}>
                    <h2>Add New Service</h2>
                    <p>Please add some details for your service</p>
                    <Divider />
                </div>
                <ValidatorForm onSubmit={submitNewService} className={classes.form}>
                    <TextValidator
                        value={title}
                        onChange={changeTitle}
                        type="text"
                        margin="normal"
                        label="Enter title"
                        validators={['required']}
                        errorMessages={['Title is required']} />
                    <FormControl style={{ width: "100%" }}>
                        <TextValidator
                            select
                            margin="normal"
                            id="selectService"
                            label="Select service"
                            value={category}
                            onChange={changeCategory}
                            validators={['required']}
                            errorMessages={['Select service type']} >
                            {SERVICE_CATEGORIS_LIST.map(typeItem => <MenuItem key={typeItem} value={typeItem}>{typeItem}</MenuItem>)}
                        </TextValidator>
                    </FormControl>
                    {category &&
                        <FormControl style={{ width: "100%" }}>
                            <TextValidator
                                select
                                margin="normal"
                                id="selectService"
                                label="Select subcategory"
                                fullWidth
                                value={subcategory}
                                onChange={changeSubcategory}
                                validators={['required']}
                                errorMessages={['This field is required']} >
                                {SERVICE_SUBCATEGORIS_LIST[category].map(subcategory => <MenuItem value={subcategory}>{subcategory}</MenuItem>)}
                            </TextValidator>
                        </FormControl>
                    }
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
                        <label htmlFor="text">Add a Short Description</label>
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
                                            <div className={classes.image} key={image}>
                                                <img src={image} alt="service-img" />
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
