import React from 'react';
import styles from './styles/LayoutStyles';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';

function Layout(props){
    const {classes} = props;
    const serviceCategories = ['Web Development', 'Translation', 'Logo Design', 'Mobile Apps', 'Photoshop Editing'];

    return(
        <div>
            <Navbar serviceCategories={serviceCategories}/>
            <main className={classes.root}>{props.children}</main>
        </div>
    );
}

export default withStyles(styles)(Layout);