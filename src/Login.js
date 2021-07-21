import React, { useState } from 'react';
import { useAuth } from './contexts/authContext';
import useInputState from './hooks/useInputState';
import { withStyles } from '@material-ui/styles';
import styles from './styles/LoginStyles';
import Loader from 'react-loader-spinner';
import Layout from './Layout';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function Login(props) {
    const { classes, history } = props;

    const [email, changeEmail, resetEmail] = useInputState('');
    const [password, changePassword, resetPassword] = useInputState('');

    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(email, password);
            resetEmail()
            resetPassword()
            history.push('/')
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
        setLoading(false)
    }
    return (
        <Layout>
            <section className={classes.root}>
                <div className={classes.header}>
                    <h2>Log In</h2>
                    <p>Please log in to your account and start explore our services</p>
                    <Divider />
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
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
                        label="Enter Your Password"
                        validators={['required']}
                        errorMessages={['Password is required']} />
                    <Button
                        variant="contained"
                        disabled={loading}
                        style={{ width: "50%", backgroundColor: "#23775a", color: "white", marginTop: "2rem" }}
                        type="submit">
                        {loading ?
                            <div className={classes.spinner}>
                                <Loader
                                    type="TailSpin"
                                    color="rgb(250, 250, 250)"
                                    height={20}
                                    width={20}
                                    timeout={10000}
                                />
                            </div> :
                            'Log In'}
                    </Button>
                </ValidatorForm>
                <div className={classes.needAccount}>
                    Need an account?<Link to="/signup">Sign Up</Link>
                </div>
            </section>
        </Layout>
    );
}

export default withStyles(styles)(Login);
