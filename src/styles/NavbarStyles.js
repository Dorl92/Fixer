import sizes from './sizes';

export default {
    navbar: {
        position: "fixed",
        color: "white",
        fontSize: "20px",
        top: "0",
        width: "100vw",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        height: "80px",
        zIndex: "25",
        "& a": {
            color: "white",
            margin: "0 0.5rem",
            fontSize: "20px",
            fontWeight: "400",
            textDecoration: "none",
            transition: "all 0.1s ease-in-out",
            "&:hover": {
                color: "#23775a",
            }
        },
        "& svg": {
            fill: "white"
        }
    },
    navbarScroll: {
        position: "fixed",
        color: "black",
        fontSize: "20px",
        top: "0",
        width: "100vw",
        backgroundColor: "#F1F1F1",
        borderBottom: "3px solid #e4e4e4",
        display: "flex",
        alignItems: "center",
        height: "80px",
        zIndex: "25",
        "& a": {
            color: "black",
            paddingBottom: "26px",
            margin: "0 0.5rem",
            fontSize: "20px",
            fontWeight: "400",
            textDecoration: "none",
            "&:hover": {
                borderBottom: "3px solid #bbbbbb"
            }
        }
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            fontSize: "28px",
            fontWeight: "800",
            color: "white !important"
        },
        "& span": {
            fontFamily: 'Oleo Script',
            fontSize: "30px",
        },
        [sizes.down("sm")]: {
            "& a":{
                display: "none"
            }
        }
    },
    logoScroll: {
        marginRight: "15px",
        padding: "0 13px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            fontSize: "28px",
            fontWeight: "800",
            color: "#23775a !important",
            "&:hover": {
                border: "none !important"
            }
        },
        "& span": {
            fontFamily: 'Oleo Script',
            fontSize: "30px",
            color: "#2f9974"
        },
        [sizes.down("sm")]: {
            "& a":{
                display: "none"
            }
        }
    },
    menuIcon: {
        transform: "scale(1.5)",
        padding: "0 0.5rem",
        display: "none",
        "&:hover": {
            cursor: "pointer"
        },
        [sizes.down("md")]: {
            display: "flex"
        }
    },
    navbarUserDetails: {
        display: "flex",
        alignItems: "center",
        [sizes.down("sm")]: {
            "& span": {
                display: "none"
            }
        }
    },
    searchBar: {
        paddingRight: "2rem",
        [sizes.down("lg")]: {
            display: "none"
        }
    },
    avatar: {
        width: "40px",
        height: "40px",
        margin: "0 1rem 0 0.5rem",
        "&:hover": {
            cursor: "pointer"
        }
    },
    navbarLinks: {
        padding: "0.5rem 1rem",
        display: "flex",
        height: "100%",
        alignItems: "center",
        [sizes.down("md")]: {
            display: "none"
        }
    },
    activeLink: {
        borderBottom: "1px solid white"
    },
    activeLinkScroll: {
        borderBottom: "3px solid #23775a !important"
    },
    authLinks: {
        display: "flex",
        alignItems: "center",
        marginRight: "1rem",
        marginLeft: "auto",
        // [sizes.down("sm")]: {
        //     paddingRight: "0.5rem",
        //     marginRight: "0.3rem",
        //     "& a": {
        //         fontSize: "16px"
        //     }
        // }
    },
    signout: {
        transform: "scale(1.3)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            color: "#b80e0e",
            cursor: "pointer"
        }
    },
    drawerNavbar: {
        color: "black",
        fontSize: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        "& a": {
            color: "black",
            margin: "0.5rem 3rem",
            fontSize: "20px",
            fontWeight: "400",
            textDecoration: "none",
            transition: "all 0.1s ease-in-out",
            "&:hover": {
                color: "#23775a",
            }
        },
        "& svg": {
            fill: "white"
        }
    },
    drawerLogo: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: "1rem",
        "& a": {
            fontSize: "28px",
            fontWeight: "900",
            color: "#23775a"
        },
        "& span": {
            fontFamily: 'Oleo Script',
            fontSize: "30px",
            color: "#2f9974"
        }
    },
    drawerAuthLinks: {
        display: "flex",
        flexDirection: "column",
        marginTop: "4rem"
    },
    signoutButton: {
        backgroundColor: "#23775a",
        color: "white",
        fontSize: "18px",
        fontWeight: "300",
        outline: "none",
        border: "none",
        padding: "10px 30px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        alignSelf: "center",
        width: "70%",
        "&:hover": {
            backgroundColor: "#164736",
        },
    }
}