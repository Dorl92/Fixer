import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './styles/FooterStyles';
import { withStyles } from '@material-ui/core/styles';
import { Fragment } from 'react';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

function Footer(props) {
    const { classes } = props;

    return (
        <Fragment>
            <div className={classes.footer}>
                <div className={classes.logo}>
                    <div><Link exact={true} to="/">service<span>im</span></Link></div>
                </div>
                <div className={classes.socialIcons}>
                    <TwitterIcon className={classes.icon} />
                    <LinkedInIcon className={classes.icon} />
                    <GitHubIcon className={classes.icon} />
                    <FacebookIcon className={classes.icon} />
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(withStyles(styles)(Footer));