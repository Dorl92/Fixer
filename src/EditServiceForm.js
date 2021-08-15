import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { SERVICE_CATEGORIS_LIST, SERVICE_SUBCATEGORIS_LIST } from './utils/constants';
//contexts
import { useServicesContext } from './contexts/servicesContext';
//hooks
import useInputState from './hooks/useInputState';
//components
import Layout from './Layout';
import Loader from 'react-loader-spinner';
//style
import styles from './styles/EditServiceFormStyles';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//material-ui
import { withStyles } from '@material-ui/styles';
import { Delete } from '@material-ui/icons';
import { Divider, MenuItem, FormControl, Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


function EditServiceForm(props) {
    const { classes, history, match, serviceToEdit } = props;

    const { editService } = useServicesContext();

    const [category, changeCategory, resetCategory, setCategory] = useInputState("");
    const [subcategory, changeSubcategory, resetSubcategory, setSubcategory] = useInputState("");
    const [title, changeTitle, resetTitle, setTitle] = useInputState("");
    const [description, changeDescription, resetdescription, setDes] = useInputState("");
    const [price, changePrice, resetPrice, setPrice] = useInputState("");
    const [images, setImages] = useState([]);

    const [loadingUploadImage, setLoadingUploadImage] = useState(false);
    const [isImages, setIsImages] = useState(false);
    const [isDescription, setIsDescription] = useState(false);

    useEffect(() => {
        if (serviceToEdit) {
            setCategory(serviceToEdit.category)
            setSubcategory(serviceToEdit.subcategory)
            setTitle(serviceToEdit.title)
            setDes(serviceToEdit.description)
            setPrice(serviceToEdit.price)
            setImages(serviceToEdit.images)
        }
    }, [serviceToEdit])

    useEffect(() => {
        ValidatorForm.addValidationRule('isPricePositive', (value) =>
            value > 0)
    }, [price]);

    const handleUploadImages = async (evt) => {
        const uploadImages = [...images];
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

    const submitNewService = (e) => {
        e.preventDefault();
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
        const updatedService = {
            ...serviceToEdit,
            category: category,
            subcategory: subcategory,
            title: title,
            description: description,
            price: price,
            images: images,
        }
        editService(updatedService, match.params.id);
        resetCategory();
        resetSubcategory();
        resetTitle();
        resetdescription();
        resetPrice();
        history.push('/services');
    }

    const handleDeleteImage = (imageToRemove) => {
        const filteredImages = images.filter(image => imageToRemove !== image)
        setImages(filteredImages)
    }

    return (
        <Layout>
            {serviceToEdit ?
                <section className={classes.root}>
                    <div className={classes.header}>
                        <h2>Edit Your Service</h2>
                        <p>Please update your service details</p>
                        <Divider />
                    </div>
                    <ValidatorForm onSubmit={submitNewService} className={classes.form}>
                        <TextValidator
                            value={title}
                            onChange={changeTitle}
                            fullWidth
                            type="text"
                            margin="normal"
                            label="Enter title for your service"
                            validators={['required']}
                            errorMessages={['This field is required']} />
                        <FormControl style={{ width: "100%" }}>
                            <TextValidator
                                select
                                margin="normal"
                                id="selectService"
                                label="Select service category"
                                fullWidth
                                value={category}
                                onChange={changeCategory}
                                validators={['required']}
                                errorMessages={['This field is required']} >
                                {SERVICE_CATEGORIS_LIST.map(category => <MenuItem value={category}>{category}</MenuItem>)}
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
                            fullWidth
                            type="number"
                            size="medium"
                            margin="normal"
                            label="Set start price ($)"
                            validators={['required', 'isPricePositive']}
                            errorMessages={['This field is required', 'Price must be bigger then 0']} />
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
                        <label className={classes.inputImageLabel} htmlFor="file">Add Some more Images</label>
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
                                                        <Delete />
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
                                color="primary"
                                type="submit">
                                Edit Service
                            </Button>
                        </div>
                    </ValidatorForm>
                </section>
                : <div className={classes.spinner}>
                    <Loader
                        type="TailSpin"
                        color="#29bb89"
                        height={100}
                        width={100}
                        timeout={10000}
                    />
                </div>
            }
        </Layout>
    );
}

export default withStyles(styles)(EditServiceForm);