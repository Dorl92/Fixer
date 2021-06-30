import sizes from './sizes';

export default {
    "@global": {
        ".fade-enter": {
            opacity: 0
        },
        ".fade-enter-active": {
            opacity: 1,
            transition: "opacity 500ms ease-out"
        },
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        },
        ".slick-prev": {
            "&:before": {
                color: "black",
            }
        },
        ".slick-next": {
            "&:before": {
                color: "black"
            }
        }
    },
    root: {
        width: "100%",
        marginTop: "1rem"
    },
    title: {
        width: "fit-content",
        marginBottom: "0.2rem",
        color: "#525252",
        fontSize: "24px",
        fontWeight: "700"
    },
    subtitle: {
        fontSize: "16px",
        color: "#525252",
        fontWeight: "300",
        marginBottom: "0.5rem",
    },
    container: {
        display: "flex",
        [sizes.down("xxl")]: {
            display: "block",
        },
        [sizes.down("xxl")]: {
            display: "flex",
        },
        [sizes.down("md")]: {
            display: "block",
        },
    },
    stageContainer: {
        width: "25%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        margin: "0.2rem",
    },
    stageTitle: {
        width: "260px",
        padding: "0.5rem 0",
        marginBottom: "0.5rem",
        color: "#525252",
        fontSize: "20px",
        fontWeight: "700",
        textAlign: "center",
    },
    solds: {
        display: "flex",
        flexDirection: "column"
    }
}