import sizes from './sizes';

export default {
    root: {
        width: "25%",
        color: "#525252",
        fontWeight: "300",
        boxShadow: " 0px 3px 25px -10px rgba(111,120,111,1)",
        borderRadius: "20px",
        padding: "1.5rem 0",
        margin: "2rem 0",
        [sizes.down("xxxl")]: {
            width: "35%",
        },
        [sizes.down("xxl")]: {
            width: "40%",
        },
        [sizes.down("xl")]: {
            width: "45%",
        },
        [sizes.down("lg")]: {
            width: "50%",
        },
        [sizes.down("md")]: {
            width: "55%",
        },
        [sizes.down("sm")]: {
            width: "65%",
        },
    },
    header: {
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    form: {
        display: "flex",
        alignItems: "center",
        width: "50%",
        flexDirection: "column",
        margin: "1rem auto 2rem auto",
        "& div": {
            width: "100%"
        }
    },
    input: {
        display: 'none',
    },
    description: {
        display: "flex",
        flexDirection: "column",
        fontSize: "15px",
        color: "gray",
        width: "100%",
        margin: "1rem 0",
        "& textarea": {
            fontFamily: "inherit",
            fontSize: "17px",
            borderRadius: "6px",
        }
    },
    button: {
        display: 'flex',
        justifyContent: "center",
        marginTop: "2rem",
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
        width: "90%",
        marginTop: "1rem",
        textAlign: "center",
        border: "1px solid #727474",
        fontFamily: "inherit",
        padding: "0.3rem 0.7rem",
        borderRadius: "5px",
        backgroundColor: "white",
        display: "inline-block",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            cursor: "pointer",
            border: "1px solid #29bb89",
            color: "#23775a",
            backgroundColor: "rgb(250, 250, 250)"
        },
        "&:focus": {
            outline: "none"
        }
    },
    imagesContainer: {
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: "repeat(2, 50%)",
        gridGap: "0.3rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(1, 100%)",
        },
    },
    image: {
        position: "relative",
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& img": {
            height: "80px",
            width: "140px",
            borderRadius: "4px",
            [sizes.down("md")]: {
                height: "130px",
                width: "200px",
            },
        }
    },
    deleteImageIcon: {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
        width: "140px",
        [sizes.down("md")]: {
            height: "130px",
            width: "200px",
        },
        borderRadius: "4px",
        zIndex: "5",
        backgroundColor: "rgb(0,0,0,0.4)",
        transition: "all 0.2s ease-in-out",
        opacity: "0",
        "& svg": {
            transform: "scale(1.5)",
            color: "white"
        },
        "&:hover": {
            opacity: "1",
            cursor: "pointer"
        }
    },
    spinner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto auto",
        "& div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem"
        }
    },
    validationError: {
        color: "red",
        fontSize: "14px",
        margin: "0.5rem 0"
    }
}