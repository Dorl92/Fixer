export default {
    reviewForm: {
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "4px",
        margin: "1rem 1rem",
        padding: "1rem 1rem",
        "& span": {
            fontSize: "22px",
            fontWeight: "700",
        },
        "& fieldset": {
            minHeight: "40px"
        }
    },
    reviewText: {
        display: "flex",
        flexDirection: "column",
        fontSize: "17px",
        "& textarea": {
            fontFamily: "inherit",
            fontSize: "17px",
            borderColor: "rgb(221, 221, 221)"
        }
    },
    button: {
        margin: "1rem 0",
        "& span": {
            fontSize: "14px",
            fontWeight: "300",
        }
    },
    validationError:{
        color: "red",
        fontSize: "14px",
        margin: "0.5rem 0"
    }
}