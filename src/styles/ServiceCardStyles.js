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
        }
    },
    card: {
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "2px",
        backgroundColor: "rgb(250, 250, 250)",
        margin: "1rem 0",
        width: "300px",
        height: "420px"
    },
    image: {
        position: "relative",
        boxShadow: "-1px 10px 52px -30px rgba(0,0,0,0.75)",
        width: "100%",
        height: "47%",
        "& img": {
            width: "100%",
            height: "100%",
            borderRadius: "2px",
        },
        "&:hover": {
            cursor: "pointer"
        }
    },
    slideButtons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(0,0,0,0.3)",
        position: "absolute",
        borderRadius: "2px",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        opacity: "0",
        transition: "all 0.2s ease-in-out",
        "& svg": {
            padding: "0.5rem",
            transform: "scale(2)",
            color: "white"
        },
        "&:hover svg": {
            cursor: "pointer",
        },
        "&:hover": {
            opacity: "1",
        },
    },
    options: {
        position: "absolute",
        width: "300px",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 10,
        "& button": {
            color: "#F1F1F1",
            transform: "scale(1.25)"
        }
    },
    sellerBar: {
        display: "flex",
        alignItems: "center",
        height: "10%",
        padding: "0.7rem 1.2rem 1rem"
    },
    sellerName: {
        padding: "0 0.5rem",
        fontSize: "17px",
        fontWeight: "500",
        "&:hover": {
            cursor: "pointer"
        }
    },
    serviceTitle: {
        padding: "0 0.5rem",
        color: "gray",
        fontSize: "14px",
        fontWeight: "300"
    },
    avatar: {
        width: "35px",
        height: "35px",
        "&:hover": {
            cursor: "pointer"
        }
    },
    description: {
        padding: "0rem 1.2rem 0 1.5rem",
        fontWeight: "700",
        height: "18.5%",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            color: "rgb(38, 180, 38)",
            cursor: "pointer"
        }
    },
    score: {
        display: "flex",
        alignItems: "center",
        height: "5%",
        margin: "0 0.5rem 0.5rem",
        fontSize: "15px",
        fontWeight: "500",
        "& svg": {
            fontSize: "20px",
        }
    },
    footer: {
        display: "flex",
        height: "11%",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 10,
        "&:hover": {
            cursor: "pointer"
        }
    },
    price: {
        padding: "0 1rem",
        fontSize: "14px",
        fontWeight: "400",
        color: "rgb(102, 99, 99)",
        "& strong": {
            fontSize: "18px",
        }
    },
    slide: {
        opacity: "0",
        transitionDuration: "1s ease"
    },
    slideActive: {
        opacity: "1",
        height: "100%",
        transitionDuration: "1s",
    }
}