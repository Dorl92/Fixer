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
            width: "90%",
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