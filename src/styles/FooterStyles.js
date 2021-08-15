export default {
    footer: {
        fontSize: "20px",
        width: "100vw",
        backgroundColor: "#F1F1F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "120px",
        marginTop: "5rem",
    },
    logo: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        marginLeft: "5rem",
        "& a": {
            fontSize: "28px",
            fontWeight: "300",
            color: "#535353",
            textDecoration: "none"
        },
        "& span": {
            fontFamily: 'Oleo Script',
            fontSize: "30px",
        },
    },
    socialIcons:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#535353",
        marginRight: "5rem",
    },
    icon:{
        margin: "0.3rem",
        transform: "scale(1.15)",
        padding: "0.4rem",
        borderRadius: "50%",
        transition: "all 0.2s ease-in-out",
        "&:hover":{
            cursor: "pointer",
            backgroundColor: "#e0e0e0",
        }
    }
}