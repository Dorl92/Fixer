import sizes from './sizes';

export default {
    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    container: {
        width: "65%",
        color: "#525252",
        [sizes.down("xxxl")]: {
            width: "85%",
        },
        [sizes.down("lg")]: {
            width: "90%",
        },
        [sizes.down("md")]: {
            width: "75%",
        },
        [sizes.down("sm")]: {
            width: "60%",
        },
    },
    services: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: "repeat(4, 25%)",
        gridGap: "1rem",
        marginTop: "2rem",
        marginBottom: "2rem",
        [sizes.down("xl")]: {
            gridTemplateColumns: "repeat(3, 33.3333%)",
        },
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        [sizes.down("sm")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "0rem",
        },
    },
    title:{
        fontWeight: "600",
    },
    subtitle:{
        fontWeight: "300",

    },
    spinner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "5rem auto"
    }
}