export default {
    saleContainer: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "230px",
        height: "120px",
        // border: "1px solid rgb(221, 221, 221)",
        borderRadius: "10px",
        backgroundColor: "rgb(240, 240, 240)",
        marginBottom: "1rem",
        padding: "0.5rem",
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
        borderRadius: "10px",
        // border: "1px solid rgb(0,0,0,0.1)",
        top: "0",
        left: "0",
        width: "inherit",
        height: "inherit",
        padding: "0.5rem",
        opacity: "0",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            opacity: "1"
        },
    },
    saleHeader: {
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
        fontSize: "14px",
        fontWeight: "300",
        padding: "1px 12px",
        margin: "3px 0px"
    },
    saleServiceType: {
        borderRadius: "15px",
        backgroundColor: "#29bb89",
        color: "white",
        width: "fit-content",
        fontSize: "12px",
        fontWeight: "300",
        padding: "1px 12px",
    },
    saleDelivery: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    saleDays: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        fontSize: "20px",
        fontWeight: "700",
        // color: "#525252",
        borderRadius: "50%",
        backgroundColor: "white",
        // border: "1px solid green"
    },
    salePurchasedUser: {
        marginBottom: "5px",
        color: "#525252",
        fontSize: "16px",
        fontWeight: "300"
    },
}