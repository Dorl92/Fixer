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
            "&:before":{
                color: "black",
            }
        },
        ".slick-next": {
            "&:before":{
                color: "black"
            }
        }
    },
    root: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start", 
        alignItems: "top",
    },
    stageContainer: {
        width: "fit-content",
        height: "fit-content",
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "10px",
        backgroundColor: "rgb(250, 250, 250)",
        padding: "0 0.5rem",
        borderRight: "1px solid rgb(221, 221, 221)",
        margin: "0 0.2rem 1rem"
    },
    stageTitle: {
        width: "fit-content",
        borderRadius: "15px",
        backgroundColor: "white",
        padding: "0.5rem 1.5rem",
        margin: "0.5rem auto 0.5rem auto",
        color: "#525252",
        fontSize: "16px",
        fontWeight: "600"
    }
}