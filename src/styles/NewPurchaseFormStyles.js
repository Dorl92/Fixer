export default{
    root: {
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
        color: "#525252",
        fontWeight: "300",
        padding: "2rem",
    },
    form: {
        width: "70%",
        marginTop: "1rem"
    },
    serviceName:{
        fontSize: "24px",
        margin: "0.5rem 0"
    },
    sellerName:{
        fontSize: "18px",
        marginBottom: "1rem"
    },
    description: {
        display: "flex",
        flexDirection: "column",
        fontSize: "17px",
        width: "100%",
        margin: "1rem 0",
        "& textarea": {
            fontFamily: "inherit",
            fontSize: "17px",
        }
    },
    button: {
        display: 'flex',
        justifyContent: "center",
        marginTop: "2rem",
    },
}