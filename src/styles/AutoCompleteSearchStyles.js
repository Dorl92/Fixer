import sizes from './sizes';

export default {
    searchContainer: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        height: "450px",
        padding: "6% 10%",
        transition: "opacity 1s ease-in-out"
    },
    carousel: {
        position: "absolute",
        width: "100%",
        height: "700px",
        top: "0",
        left: "0",
        zIndex: "1"
    },
    searchTitle: {
        margin: "0.8rem 0",
        color: "white",
        fontSize: "38px",
        fontWeight: "600",
        zIndex: "2",
        [sizes.down("sm")]: {
            fontSize: "26px",
        },
    },
    popularTabs: {
        display: "flex",
        alignItems: "center",
        margin: "1rem 0",
        fontSize: "16px",
        color: "white",
        zIndex: "2",
        "& span": {
            marginRight: "0.5rem"
        },
        [sizes.down("sm")]: {
            display: "none",
        },
    },
    tab: {
        border: "2px solid white",
        borderRadius: "15px",
        margin: "0 0.3rem",
        padding: "1px 12px",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
            cursor: "pointer"
        }
    }
}