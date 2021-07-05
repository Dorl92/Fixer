import React, { useState } from 'react';
import { useAuth } from './contexts/authContext';
import axios from 'axios';
import useInputState from './hooks/useInputState';
import Avatar from '@material-ui/core/Avatar';
import Loader from 'react-loader-spinner';
import Layout from './Layout';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles/SignupStyles';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Fragment } from 'react';

function Signup(props) {
    const { classes, history, addNewUser } = props;

    const [email, changeEmail, resetEmail] = useInputState('');
    const [password, changePassword, resetPassword] = useInputState('');
    const [username, changeUsername, resetUsername] = useInputState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [country, changeCountry, resetCountry] = useInputState('');

    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingUploadImage, setLoadingUploadImage] = useState(false);


    const handleUploadImage = evt => {
        const files = evt.target.files[0];
        const formData = new FormData();
        formData.append("upload_preset", "fixer_app");
        formData.append("file", files);
        setLoadingUploadImage(true)
        axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
            .then(res => {
                setPhotoUrl(res.data.secure_url)
                setLoadingUploadImage(false)
            })
            .catch(err => console.log(err));
    }

    const handleDeleteImage = evt => {
        setPhotoUrl('')
    }

    const formatDate = (date) => {
        return (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    const handleSignup = async (evt) => {
        evt.preventDefault();
        try {
            setError('')
            setLoadingSubmit(true)
            let currentUser = await signup(email, password, username, photoUrl);
            const memberSince = new Date(currentUser.user.metadata.creationTime)
            const newUser = {
                userId: currentUser.user.uid,
                email: email,
                username: username,
                photoUrl: photoUrl,
                country: country,
                memberSince: formatDate(memberSince),
                isSeller: false
            }
            addNewUser(newUser)
            resetEmail()
            resetPassword()
            resetUsername()
            resetCountry();
            setPhotoUrl('')
            history.push('/')
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
        setLoadingSubmit(false)
    }
    return (
        <Layout>
            <section className={classes.root}>
                <div className={classes.header}>
                    <h2>Sign Up</h2>
                    <p>Please fill a short & basic info to create your account</p>
                    <Divider />
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <ValidatorForm onSubmit={handleSignup} className={classes.form}>
                    <TextValidator
                        value={email}
                        onChange={changeEmail}
                        type="email"
                        margin="normal"
                        label="Enter Your Email"
                        validators={['required']}
                        errorMessages={['Email is required']} />
                    <TextValidator
                        value={password}
                        onChange={changePassword}
                        type="password"
                        margin="normal"
                        label="Choose a Password"
                        validators={['required']}
                        errorMessages={['Password is required']} />
                    <TextValidator
                        value={username}
                        onChange={changeUsername}
                        type="text"
                        margin="normal"
                        label="Choose a Username"
                        validators={['required']}
                        errorMessages={['Username is required']} />
                    <TextValidator
                        value={country}
                        onChange={changeCountry}
                        type="text"
                        margin="normal"
                        label="Your Country"
                        validators={['required']}
                        errorMessages={['Country is required']} />
                    <input
                        id="file"
                        type="file"
                        name="file"
                        className={classes.inputImage}
                        onChange={handleUploadImage} />
                    <label className={classes.inputImageLabel} htmlFor="file">Upload Profile Image</label>
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
                                {photoUrl &&
                                    <div className={classes.image}>
                                        <Avatar src={photoUrl} className={classes.avatarImage} />
                                        <section className={classes.deleteImageIcon} onClick={handleDeleteImage} >
                                            <DeleteIcon />
                                        </section>
                                    </div>
                                }
                            </Fragment>
                        }
                    </Fragment>
                    <Button
                        variant="contained"
                        disabled={loadingSubmit}
                        style={{ width: "50%", backgroundColor: "#23775a", color: "white", marginTop: "2rem" }}
                        type="submit">
                        {loadingSubmit ?
                            <div>
                                <Loader
                                    type="TailSpin"
                                    color="rgb(250, 250, 250)"
                                    height={20}
                                    width={20}
                                    timeout={10000}
                                />
                            </div> :
                            'Sign Up'}
                    </Button>
                </ValidatorForm>
                <div className={classes.haveAccount}>
                    Already have an account?<Link to="/login">Log In</Link>
                </div>
            </section>
        </Layout>
    );
}

export default withStyles(styles)(Signup);


