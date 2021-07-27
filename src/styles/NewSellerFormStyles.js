import sizes from './sizes';

export default {
    root: {
        width: "25%",
        color: "#525252",
        fontWeight: "300",
        "& h2": {
            fontWeight: "500"
        },
        [sizes.down("xxl")]: {
            width: "35%",
        },
        [sizes.down("lg")]: {
            width: "45%",
        },
        [sizes.down("md")]: {
            width: "55%",
        },
        [sizes.down("sm")]: {
            width: "90%",
        }
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "1rem auto 2rem auto",
        width: "60%",
        "& div":{
            width: "100%"
        }
    },
    description: {
        display: "flex",
        flexDirection: "column",
        fontSize: "17px",
        width: "60%",
        margin: "1rem 0",
        "& textarea": {
            fontFamily: "inherit",
            fontSize: "17px",
        }
    },
    button: {
        display: 'flex',
        justifyContent: "center",
        marginTop: "2rem",
        "& button": {
            width: "65%",
            backgroundColor: "#23775a",
            color: "white"
        },
        [sizes.down("sm")]: {
            "& button":{
                width: "90%"
            }
        }

    },
}