import sizes from './sizes';

export default {
    "@global": {
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
    container: {
        width: "50%",
        dispaly: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
    },
    searchContainer: {
        marginBottom: "10rem"
    },
    popularServices: {
        width: "100%",
    },
    slider: {
        margin: "0 auto 5rem auto",
        width: "90%",
        "& img": {
            width: "270px",
            height: "375px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
                opacity: "0.65",
            }
        },
        "& h4": {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            marginLeft: "1.5rem",
            marginTop: "1.5rem",
            zIndex: "10",
            fontSize: "30px",
            color: "rgb(250, 250, 250)",
            "& small": {
                fontSize: "16px",
                fontWeight: "300",
            }
        },
        [sizes.down("xxxl")]: {
            "& img": {
                width: "240px",
                height: "330px",
            }
        },
        [sizes.down("xxl")]: {
            "& h4": {
                fontSize: "26px",
            },
            "& img": {
                width: "210px",
                height: "287px",
            }
        },
        [sizes.down("xl")]: {
            "& img": {
                width: "195px",
                height: "267px",
            }
        },
        [sizes.down("lg")]: {
            width: "95%",
            "& img": {
                width: "175px",
                height: "240px",
            }
        },
        [sizes.down("md")]: {
            display: "none"
        },
    },
    sliderTitle: {
        marginLeft: "6%",
        marginBottom: "1.5rem",
        fontSize: "45px",
        fontWeight: "600",
        color: "#525252",
        [sizes.down("xxl")]: {
            marginLeft: "5%",
        },
        [sizes.down("xl")]: {
            fontSize: "35px",
        },
        [sizes.down("md")]: {
            display: "none",
        },
    },
    firstContainer: {
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        [sizes.down("xl")]: {
            width: "90%",
        },
        [sizes.down("lg")]: {
            width: "95%",
        },
        [sizes.down("md")]: {
            display: "flex",
            width: "100%",
            flexDirection: "column-reverse"
        },
    },
    secondContainer: {
        width: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        [sizes.down("xl")]: {
            width: "90%",
        },
        [sizes.down("lg")]: {
            width: "95%",
        },
        [sizes.down("md")]: {
            display: "flex",
            width: "100%",
            flexDirection: "column"
        },
    },
    text: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        "& p": {
            width: "60%",
            fontSize: "18px",
            fontWeight: "200",
        },
        "& h2": {
            fontSize: "34px",
            fontWeight: "200"
        },
        [sizes.down("md")]: {
            width: "100%",
            padding: "1rem 0",
            "& p": {
                width: "80%",
            }
        },
    },
    image: {
        width: "50%",
        [sizes.down("md")]: {
            width: "100%",
        },
    }
}