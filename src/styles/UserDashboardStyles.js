import sizes from './sizes';

export default {
    root: {
        width: "100%",
        marginBottom: "3rem"
    },
    title: {
        width: "fit-content",
        marginBottom: "0.2rem",
        color: "#525252",
        fontSize: "24px",
        fontWeight: "700"
    },
    subtitle:{
        fontSize: "16px",
        color: "#525252",
        fontWeight: "300",
        marginBottom: "0.5rem",
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        [sizes.down("md")]: {
            flexDirection: "column",
        },
    },
    legend: {
        width: "20%",
        padding: "1rem",
        [sizes.down("md")]: {
            width: "70%",
        },
    },
    category: {
        display: "flex",
        alignItems: "center",
        marginBottom: "0.3rem"
    },
    categoryCircle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        backgroundColor: "#A22E2E",
        fontSize: "13px",
        fontWeight: "700",
        marginRight: "0.5rem"
    },
    categoryText: {
        fontSize: "15px",
        fontWeight: "700"
    }
}