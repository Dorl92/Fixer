import React from 'react';
import styles from './styles/LayoutStyles';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout(props) {
    const { classes } = props;
    const serviceCategories = ['Web Development', 'Translation', 'Logo Design', 'Mobile Apps', 'Photoshop Editing'];

    return (
        <div>
            <Navbar serviceCategories={serviceCategories} />
            <main className={classes.root}>{props.children}</main>
            <Footer />
        </div>
    );
}

export default withStyles(styles)(Layout);