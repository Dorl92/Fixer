import sizes from './sizes';

export default {
    root: {
        width: "100%",
        marginBottom: "3rem"
    },
    title: {
        width: "fit-content",
        justifySelf: "center",

        margin: "0.5rem auto 0.5rem auto",
        color: "#525252",
        fontSize: "22px",
        fontWeight: "700"
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        [sizes.down("md")]: {
            display: "block",
        },
    },
    legend: {
        width: "20%",
        padding: "1rem",
        [sizes.down("md")]: {
            width: "100%",
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
    },
    purchases: {
        display: "flex",
        width: "80%",
        justifyContent: "center",
        flexDirection: "column",
        [sizes.down("xl")]: {
            width: "70%",
        },
        [sizes.down("lg")]: {
            width: "80%",
        },
        [sizes.down("md")]: {
            width: "100%",
        },
    }
}