export default {
    review: {
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "4px",
        margin: "1rem 1rem",
        padding: "1rem 1rem 0.5rem",
        "& p": {
            margin: "none"
        }
    },
    text: {
        width: "100%",
        margin: "0.8rem 0 0.2rem 0",
        fontSize: "18px"
    },
    name: {
        color: "gray"
    },
    deleteReview:{
        color: "#b80e0e",
        transform: "scale(1.2)",
        transition: "all 0.2s ease-in-out",
        "&:hover":{
            cursor: "pointer",
            transform: "scale(1.35)",

        }
    }
}