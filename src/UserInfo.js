import React, { useState, useEffect, Fragment } from 'react';
import { useAuth } from './contexts/authContext';
import { database } from "./firebase";

import axios from 'axios';

import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import SellerDashboard from './SellerDashboard';
import UserDashboard from './UserDashboard';

import { arrayMove } from 'react-sortable-hoc';

import { withStyles } from '@material-ui/styles';
import styles from './styles/UserInfoStyles';
import Avatar from '@material-ui/core/Avatar';
import Layout from './Layout';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import useInputState from './hooks/useInputState';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@material-ui/core';

function UserInfo(props) {

    const { classes, match, users, services, editUser, editPurchase } = props;

    const userId = match.params.userId;

    const { loggedUser, updatePhotoURL, updateUserName } = useAuth();

    const [userData, setUserData] = useState(null);
    const [sellerSales, setSellerSales] = useState([])
    const [userPurchases, setUserPurchases] = useState([])

    const [username, changeUsername, resetUsername, setUsername] = useInputState('');
    const [description, changeDescription, resetDescription, setDescription] = useInputState('');
    const [skill, changeSkill, resetSkill] = useInputState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const [showUsernameEdit, setShowUsernameEdit] = useState(false);
    const [showDescriptionEdit, setShowDescriptionEdit] = useState(false);
    const [showSkillEdit, setShowSkillEdit] = useState(false);


    useEffect(() => {
        database.ref('users/' + userId)
            .on('value', (snapshot) => {
                const data = snapshot.val();
                setUserData(data)
            })
    }, [userId])

    useEffect(() => {
        database.ref('purchases/')
            .on('value', (snapshot) => {
                const data = snapshot.val();
                const allPurchases = data && Object.values(data)
                if (allPurchases) {
                    const sellerSales = allPurchases.filter(purchase => purchase.sellerId === userId)
                    setSellerSales(sellerSales)
                    const userPurchases = allPurchases.filter(purchase => purchase.userId === userId)
                    setUserPurchases(userPurchases)
                }
            })
    }, [])


    let currentSkills = null;
    let newSkillsList = null;

    useEffect(() => {
        if (userData) {
            setPhotoUrl(userData.photoUrl)
            setUsername(userData.username)
            setDescription(userData.description)
        }
    }, [userData])

    const skillsList = ['Digital Marketing', 'Graphics & Design', 'Writing & Translation', 'Programming & Tech', 'Music & Audio', 'Video & Animation', 'Other'];

    if (userData && userData.isSeller) {
        currentSkills = new Set([...userData.skills]);
        newSkillsList = skillsList.filter(skillItem => !currentSkills.has(skillItem))
    }

    const handleUploadImage = async (evt) => {
        const files = evt.target.files[0];
        const formData = new FormData();
        formData.append("upload_preset", "fixer_app");
        formData.append("file", files);

        await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
            .then(res => {
                setPhotoUrl(res.data.secure_url)
                const updatedSeller = { ...userData, photoUrl: res.data.secure_url }
                updatePhotoURL(res.data.secure_url)
                editUser(updatedSeller, userId)
            })
            .catch(err => console.log(err));
        console.log(photoUrl)
    }

    const handleUsernameSubmit = (evt) => {
        evt.preventDefault()
        const updatedSeller = { ...userData, username: username }
        updateUserName(username)
        editUser(updatedSeller, userId)
        setShowUsernameEdit(false);
    }

    const handleDescriptionSubmit = (evt) => {
        evt.preventDefault()
        const updatedSeller = { ...userData, description: description }
        editUser(updatedSeller, userId)
        setShowDescriptionEdit(false);
    }

    const handleSkillSubmit = (evt) => {
        evt.preventDefault()
        currentSkills.add(skill)
        const updatedSeller = { ...userData, skills: Array.from(currentSkills) }
        editUser(updatedSeller, userId)
    }

    const openUsernameForm = () => {
        setShowUsernameEdit(true);
    }
    const openDescriptionForm = () => {
        setShowDescriptionEdit(true);
    }
    const closeDescriptionForm = () => {
        setShowDescriptionEdit(false);
    }
    const openSkillForm = () => {
        setShowSkillEdit(true);
    }
    const closeSkillForm = () => {
        setShowSkillEdit(false);
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        let updatedIndex;
        if (newIndex === 0) {
            updatedIndex = userPurchases[0].index / 2;
        }
        else if (newIndex === userPurchases.length - 1) {
            updatedIndex = userPurchases[newIndex].index + 1;
        } else if (newIndex > oldIndex) {
            updatedIndex = (userPurchases[newIndex].index + userPurchases[newIndex + 1].index) / 2;
        } else {
            updatedIndex = (userPurchases[newIndex].index + userPurchases[newIndex - 1].index) / 2;
        }
        editPurchase({ ...userPurchases[oldIndex], index: updatedIndex }, userPurchases[oldIndex].purchaseId)
    }

    return (
        <Layout>
            {userData ?
                <div className={classes.root}>
                    <div className={classes.cardsContainer}>
                        <div className={classes.cardPersnalInfo}>
                            <div className={classes.avatar}>
                                {loggedUser && loggedUser.userId === userId &&
                                    <Fragment>
                                        <input
                                            id="file"
                                            type="file"
                                            name="file"
                                            className={classes.inputImage}
                                            onChange={handleUploadImage} />
                                        <label className={classes.inputImageLabel} htmlFor="file">
                                            <AddAPhotoIcon />
                                        </label>
                                    </Fragment>
                                }
                                <Avatar src={photoUrl} className={classes.avatarImage} />
                            </div>
                            {showUsernameEdit ?
                                <form onSubmit={handleUsernameSubmit} className={classes.editUsernameForm}>
                                    <input value={username} onChange={changeUsername} />
                                    <button type="submit" className={classes.saveUsername}>Save</button>
                                </form> :
                                <div>
                                    <div className={classes.nameInfo}>
                                        {userData.username}
                                    </div>
                                    <div className={classes.edit}>
                                        {loggedUser && loggedUser.userId === userId &&
                                            <EditIcon onClick={openUsernameForm} />
                                        }
                                    </div>
                                </div>
                            }
                            <div style={{ width: "90%" }}>
                                <Divider />
                            </div>
                            <div className={classes.footerCardPersnalInfo}>
                                <div className={classes.fromInfo}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <LocationOnIcon />
                                        <span>From</span>
                                    </div>
                                    <strong >{userData.country}</strong>
                                </div>
                                <div className={classes.sinceInfo}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <PersonIcon />
                                        <span>Member Since</span>
                                    </div>
                                    <strong>{userData.memberSince}</strong>
                                </div>
                            </div>
                        </div>
                        {userData && userData.isSeller &&
                            <div className={classes.cardProfessnalInfo}>
                                <div className={classes.descriptionContainer}>
                                    <div className={classes.descriptionUpper}>
                                        <div style={{ fontWeight: "700" }}>Description</div>
                                        {loggedUser && loggedUser.userId === userId &&
                                            <button onClick={openDescriptionForm} className={classes.button}>Edit Description</button>
                                        }
                                    </div>
                                    <div className={classes.descriptionText}>
                                        {showDescriptionEdit ?
                                            <div>
                                                <form onSubmit={handleDescriptionSubmit}>
                                                    <textarea
                                                        className={classes.descriptionTextarea}
                                                        id="text"
                                                        cols="20"
                                                        rows="6"
                                                        onChange={changeDescription}
                                                        value={description}>
                                                    </textarea>
                                                    <div className={classes.descriptionButtons}>
                                                        <button onClick={closeDescriptionForm}>Cancel</button>
                                                        <button type="submit">Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            <p>
                                                {userData.description}
                                            </p>
                                        }
                                    </div>
                                    <Divider />
                                </div>
                                <div className={classes.skillsContainer}>
                                    <div className={classes.skillsUpper}>
                                        <div style={{ fontWeight: "700" }}>Skills</div>
                                        {loggedUser && loggedUser.userId === userId &&
                                            <button onClick={openSkillForm} className={classes.button}>Add New Skill</button>
                                        }
                                    </div>
                                    {showSkillEdit &&
                                        <form onSubmit={handleSkillSubmit} style={{ display: "flex", marginTop: "0.5rem" }}>
                                            <FormControl style={{ width: "70%" }}>
                                                <TextField
                                                    select
                                                    id="selectOccupation"
                                                    label="Choose Skill"
                                                    style={{ marginTop: "auto", width: "100%" }}
                                                    value={skill}
                                                    onChange={changeSkill} >
                                                    {newSkillsList.map(skillItem => <MenuItem value={skillItem}>{skillItem}</MenuItem>)}
                                                </TextField>
                                            </FormControl>
                                            <button type="submit" className={classes.skillButton}>Add</button>
                                            <button onClick={closeSkillForm} className={classes.skillButton}>Cancel</button>
                                        </form>
                                    }
                                    <div className={classes.skillsText}>
                                        <div>
                                            {userData.skills.map(skill => <div style={{ marginBottom: "0.3rem" }}>{skill}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    {loggedUser && loggedUser.userId === userId &&
                        <div className={classes.dashboard}>
                            {userPurchases.length ?
                                <UserDashboard
                                    onSortEnd={onSortEnd}
                                    userPurchases={userPurchases}
                                    services={services}
                                    users={users}
                                    editPurchase={editPurchase}
                                /> : null
                            }
                            {loggedUser.isSeller && sellerSales.length ?
                                <SellerDashboard
                                    sellerSales={sellerSales}
                                    users={users}
                                    services={services}
                                    editPurchase={editPurchase}
                                /> : null
                            }
                        </div>
                    }
                </div>
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

export default withStyles(styles)(UserInfo);