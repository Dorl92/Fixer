import React, { useState } from 'react';
//contexts
import { useAuth } from './contexts/authContext';
import { useUsersContext } from './contexts/usersContext';
//hooks
import useInputState from './hooks/useInputState';
//components
import Layout from './Layout';
//style
import styles from './styles/NewSellerFormStyles';
//material-ui
import { withStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Divider, FormControl, MenuItem, Button } from '@material-ui/core';

function NewSellerForm(props) {
    const { classes, history } = props;

    const { loggedUser } = useAuth();
    const { addNewSeller } = useUsersContext();

    const [firstname, changeFirstname, resetFirstname] = useInputState('');
    const [lastname, changeLastname, resetLastname] = useInputState('');
    const [description, changeDescription, resetDescription] = useInputState('');
    const [birthday, changeBirthday, resetBirthday] = useInputState('');
    const [skills, changeSkills, resetSkills] = useInputState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = evt => {
        evt.preventDefault();
        const newSeller = {
            isSeller: true,
            firstname: firstname,
            lastname: lastname,
            description: description,
            birthday: birthday,
            skills: [skills]
        }
        try {
            setLoading(true)
            addNewSeller(newSeller, loggedUser.userId);
            resetFirstname();
            resetLastname();
            resetDescription();
            resetBirthday();
            resetSkills();
            history.push('/');
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <Layout>
            <section className={classes.root}>
                <h2>Personal & Professional Information</h2>
                <p>Please fill your information and start sell your services</p>
                <Divider />
                <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
                    <TextValidator
                        value={firstname}
                        onChange={changeFirstname}
                        type="text"
                        margin="normal"
                        label="First Name"
                        validators={['required']}
                        errorMessages={['Firstname is required']} />
                    <TextValidator
                        value={lastname}
                        onChange={changeLastname}
                        type="text"
                        margin="normal"
                        label="Last Name"
                        validators={['required']}
                        errorMessages={['Lastname is required']} />
                    <TextValidator
                        value={birthday}
                        onChange={changeBirthday}
                        type="date"
                        label="Birthday"
                        validators={['required']}
                        errorMessages={['Enter your birthday']}
                        style={{ margin: "1rem 0" }}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <FormControl>
                        <TextValidator
                            select
                            id="selectSkill"
                            label="Select your main Skill"
                            style={{ margin: "1rem 0" }}
                            value={skills}
                            validators={['required']}
                            errorMessages={['Skill is required']}
                            onChange={changeSkills} >
                            <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
                            <MenuItem value="Graphics & Design">Graphics & Design</MenuItem>
                            <MenuItem value="Writing & Translation">Writing & Translation</MenuItem>
                            <MenuItem value="Programming & Tech">Programming & Tech</MenuItem>
                            <MenuItem value="Music & Audio">Music & Audio</MenuItem>
                            <MenuItem value="Video & Animation">Video & Animation</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextValidator>
                    </FormControl>
                    <div className={classes.description}>
                        <label for="text">Add a Short Description</label>
                        <textarea
                            id="text"
                            cols="20"
                            rows="3"
                            onChange={changeDescription}
                            value={description}>
                        </textarea>
                    </div>
                    <div className={classes.button}>
                        <Button
                            variant="contained"
                            disabled={loading}
                            type="submit">
                            Become a Seller
                        </Button>
                    </div>
                </ValidatorForm>
            </section>
        </Layout>
    );
};

export default withStyles(styles)(NewSellerForm);




