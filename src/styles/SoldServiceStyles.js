import sizes from './sizes';

export default {
    container: {
        position: "relative",
        display: "flex",
        width: "260px",
        [sizes.down("xxl")]: {
            width: "238px",
        },
        height: "130px",
        borderRadius: "4px",
        backgroundColor: "rgb(240, 240, 240)",
        marginBottom: "0.5rem",
        "&:hover svg": {
            cursor: "pointer"
        }
    },
    buttonsHover: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(0,0,0,0.1)",
        position: "absolute",
        borderRadius: "4px",
        top: "0",
        left: "0",
        width: "inherit",
        height: "inherit",
        opacity: "0",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            opacity: "1"
        },
    },
    categoryColor: {
        width: "1.5%",
        height: "100%",
        borderRadius: "4px 0 0 4px",
    },
    sale: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%"
    },
    subcategory: {
        margin: "0.5rem"
    },
    tab: {
        borderRadius: "15px",
        color: "white",
        width: "fit-content",
        fontSize: "14px",
        fontWeight: "300",
        padding: "1px 12px",
        margin: "3px 0px"
    },
    title: {
        width: "80%",
        margin: "0 0.5rem",
    },
    userDetails: {
        display: "flex",
        alignItems: "center",
        color: "#525252"
    },
    username: {
        margin: "0.5rem",
        fontSize: "14px",
        fontWeight: "300"
    },
    note: {
        zIndex: "10",
        "&:hover": {
            cursor: "pointer"
        }
    },
    header: {
        display: "flex",
        alignItems: "start",
        justifyContent: "space-between",
        paddingRight: "0.5rem"
    },
    saleTitle: {
        borderRadius: "15px",
        backgroundColor: "#23775a",
        color: "white",
        width: "fit-content",
        fontSize: "13px",
        fontWeight: "300",
        padding: "1px 12px",
        margin: "3px 0px"
    },
    delivery: {
        display: "flex",
        flexDirection: "column",
        marginTop: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
    },
    daysLeft: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        fontSize: "20px",
        fontWeight: "700",
        borderRadius: "50%",
        backgroundColor: "white",
    },
    completionBar: {
        margin: "0.5rem"
    }
}