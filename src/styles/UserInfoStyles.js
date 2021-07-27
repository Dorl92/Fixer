import sizes from './sizes';

export default {
    root: {
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        [sizes.down("xxxl")]: {
            width: "85%",
        },
        [sizes.down("xxl")]: {
            width: "90%",
        },
        [sizes.down("xl")]: {
            width: "95%",
        },
        [sizes.down("lg")]: {
            display: "block",
            alignItems: "center",
            justifyContent: "center",
        }
    },
    cardsContainer: {
        width: "25%",
        margin: "2rem 0.5rem 2rem 1rem",
        [sizes.down("lg")]: {
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto"
        },
        [sizes.down("md")]: {
            width: "50%",
        },
        [sizes.down("sm")]: {
            width: "75%",
        }
    },
    dashboard: {
        width: "75%",
        margin: "2rem 2rem",
        [sizes.down("lg")]: {
            width: "95%",
         },
    },
    cardPersnalInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgb(250, 250, 250)",
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "10px",
        width: "100%",
    },
    nameInfo: {
        fontSize: "18px",
        fontWeight: "500",
        marginBottom: "0.8rem"
    },
    edit: {
        height: "24px",
        width: "26px",
        margin: "0.5rem auto 1.7rem auto",
        "&:hover svg": {
            cursor: "pointer"
        }
    },
    fromInfo: {
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "0.3rem"
    },
    sinceInfo: {
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "0.3rem"
    },
    footerCardPersnalInfo: {
        color: "#727474",
        width: "85%",
        margin: "0.2rem 0 0.5rem",
        "& svg": {
            fontSize: "16px",
            marginRight: "0.3rem"
        }
    },
    cardProfessnalInfo: {
        backgroundColor: "rgb(250, 250, 250)",
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "10px",
        width: "100%",
        marginTop: "2rem"
    },
    avatarImage:{
        width: "150px",
        height: "150px",
    },
    avatar: {
        position: "relative",
        margin: "2rem 0 1rem",
        borderRadius: "50%",
    },
    inputImage: {
        width: "0.1px",
        height: "0.1px",
        opacity: "0",
        overflow: "hidden",
        position: "absolute",
        zIndex: "-1"
    },
    inputImageLabel: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        backgroundColor: "rgb(0,0,0,0.3)",
        opacity: "0",
        position: "absolute",
        zIndex: "5",
        transition: "all 0.3s ease-in-out",
        "& svg": {
            transform: "scale(2)",
            color: "rgb(221, 221, 221)"
        },
        "&:hover": {
            cursor: "pointer",
            opacity: "1",
        }
    },
    editUsernameForm: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "4.2rem",
        "& input": {
            border: "none",
            fontSize: "16px",
            width: "40%",
            backgroundColor: "rgb(243, 243, 243)",
            borderBottom: "1px solid rgb(221, 221, 221)",
            "&:focus": {
                outline: "none"
            }
        }
    },
    saveUsername: {
        backgroundColor: "white",
        border: "1px solid rgb(221, 221, 221)",
        color: "#727474",
        borderRadius: "2px",
        marginLeft: "0.5rem",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            border: "1px solid #29bb89",
            color: "#29bb89",
            cursor: "pointer"
        },
        "&:focus": {
            outline: "none"
        }
    },
    descriptionContainer: {
        padding: "1rem 1rem 0.5rem"
    },
    descriptionUpper: {
        display: "flex",
        justifyContent: "space-between"
    },
    descriptionText: {
        width: "100%",
        margin: "1rem 0 0.5rem 0",
        "& p": {
            marginBottom: "1.5rem",
            paddingTop: "0.3rem",
            textAlign: "justify"
        }
    },
    descriptionTextarea: {
        width: "100%",
        border: "none",
        textAlign: "justify",
        backgroundColor: "rgb(243, 243, 243)",
        fontFamily: "inherit",
        fontSize: "15px",
        "&:focus": {
            outline: "none"
        }
    },
    descriptionButtons: {
        display: "flex",
        justifyContent: "space-between",
        "& button": {
            backgroundColor: "white",
            width: "49%",
            border: "1px solid rgb(221, 221, 221)",
            color: "#727474",
            borderRadius: "2px",
            padding: "0.3rem 0 0.3rem",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
                border: "1px solid #29bb89",
                color: "#29bb89",
                cursor: "pointer"
            },
            "&:focus": {
                outline: "none"
            }
        }
    },
    skillsContainer: {
        padding: "0.5rem 1rem 1rem"
    },
    skillsUpper: {
        display: "flex",
        justifyContent: "space-between"
    },
    skillsText: {
        width: "100%",
        margin: "1rem 0 0.5rem 0",
    },
    button: {
        border: "none",
        backgroundColor: "rgb(250, 250, 250)",
        fontWeight: "600",
        fontFamily: "inherit",
        color: "#23775a",
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer"
        }
    },
    skillButton: {
        backgroundColor: "white",
        height: "35px",
        width: "fit-content",
        border: "1px solid rgb(221, 221, 221)",
        color: "#727474",
        borderRadius: "2px",
        marginLeft: "0.3rem",
        marginTop: "auto",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            border: "1px solid #29bb89",
            color: "#29bb89",
            cursor: "pointer"
        },
        "&:focus": {
            outline: "none"
        }
    },
    spinner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto auto"
    }
}