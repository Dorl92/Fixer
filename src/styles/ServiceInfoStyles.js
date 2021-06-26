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
        display: "flex",
        margin: "2rem 1rem 2rem 3rem",
        width: "70%",
        [sizes.down("xl")]: {
            width: "80%",
        },
        [sizes.down("lg")]: {
            display: "block",
        }
    },
    serviceContainer: {
        display: "flex",
        flexDirection: "column",
        width: "70%",
        margin: "0 0.5rem 3rem",
        [sizes.down("lg")]: {
            width: "100%",
        }
    },
    serviceDetails:{
        display: "flex",
        flexDirection: "column",
    },
    serviceTitle: {
        margin: "0.5rem 1rem",
        fontSize: "32px",
        fontWeight: "700"
    },
    serviceType: {
        color: "gray",
        fontWeight: "600",
        fontSize: "17px"
    },
    serviceData: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0.5rem 0rem 1.5rem 1rem",
        [sizes.down("md")]: {
            display: "block",
        }
    },
    sellerData: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        width: "45px",
        height: "45px",
        "&:hover": {
            cursor: "pointer"
        }
    },
    sellerName: {
        padding: "0 1rem"
    },
    averageStars: {
        display: "flex",
        alignItems: "center",
    },
    averageRating: {
        padding: "0 0.5rem",
        color: "rgb(202, 178, 44)",
        fontWeight: "700",
    },
    servicePurchaseButton: {
        backgroundColor: "#23775a",
        color: "white",
        fontSize: "16px",
        fontWeight: "300",
        outline: "none",
        border: "none",
        padding: "10px 25px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            backgroundColor: "#164736",
        },
        [sizes.down("md")]: {
            margin: "1rem 0 0",
        }
    },
    slider:{
        margin: "2rem 0 2rem",
        alignSelf: "center",
        width: "90%"
    },
    fullDescription: {
        fontSize: "24px",
        margin: "1.5rem 1rem",
    },
    reviewsContainer: {
        width: "30%",
        margin: "3rem 0.5rem 1rem",
        [sizes.down("lg")]: {
            width: "50%",
            alignSelf: "center"
        },
        [sizes.down("sm")]: {
            width: "100%",
        }
    },
    spinner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto auto"
    },
}