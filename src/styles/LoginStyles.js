import sizes from './sizes';

export default {
    root: {
        width: "25%",
        color: "#525252",
        fontWeight: "300",
        marginTop: "2rem",
        "& h2": {
            fontWeight: "500",
        },
        [sizes.down("xxl")]: {
            width: "30%",
        },
        [sizes.down("xl")]: {
            width: "35%",
        },
        [sizes.down("lg")]: {
            width: "50%",
        },
        [sizes.down("sm")]: {
            width: "65%",
        },
    },
    form: {
        display: "flex",
        alignItems: "center",
        width: "60%",
        flexDirection: "column",
        alignItems: "center",
        margin: "1rem auto 2rem auto",
        "& div":{
            width: "100%"
        }
    },
    needAccount: {
        display: "flex",
        justifyContent: "center",
        "& a": {
            textDecoration: "none",
            color: "#328bd4",
            padding: "0 0.5rem",
            "&:hover": {
                textDecoration: "underline"
            }
        },
    },
}