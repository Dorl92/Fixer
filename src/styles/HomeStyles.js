import sizes from './sizes';

export default {
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
    carouselTitle: {
        marginLeft: "12.5%",
        marginBottom: "1.5rem",
        fontSize: "45px",
        fontWeight: "600",
        color: "#525252",
        [sizes.down("xl")]: {
            fontSize: "35px",
        },
        [sizes.down("md")]: {
            display: "none",
        },
    },
    slider: {
        margin: "0 auto 5rem auto",
        width: "75%",
        "& img": {
            width: "252px",
            height: "345px",
            background: "rgb(0,0,0,0.8)",
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
            marginLeft: "0.8rem",
            marginTop: "1rem",
            zIndex: "10",
            fontSize: "28px",
            color: "rgb(250, 250, 250)",
            "& small": {
                fontSize: "18px",
                fontWeight: "300"
            }
        },
        [sizes.down("xxxl")]: {
            width: "80%",
            "& img": {
                width: "225px",
                height: "308px",
            }
        },
        [sizes.down("xxl")]: {
            width: "85%",
            "& img": {
                width: "210px",
                height: "287px",
            }
        },
        [sizes.down("xl")]: {
            width: "90%",
            "& img": {
                width: "195px",
                height: "267px",
            }
        },
        [sizes.down("lg")]: {
            width: "95%",
            "& img": {
                width: "180px",
                height: "246px",
            }
        },
        [sizes.down("md")]: {
            display: "none"
        },
    },
    firstContainer: {
        width: "75%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        [sizes.down("xl")]: {
            width: "80%",
        },
        [sizes.down("md")]: {
            display: "flex",
            width: "100%",
            flexDirection: "column-reverse"
        },
    },
    secondContainer: {
        width: "75%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        [sizes.down("xl")]: {
            width: "80%",
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
            "& p":{
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