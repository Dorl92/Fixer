export default {
    purchaseContainer: {
        // position: "relative",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-between",
        width: "200px",
        height: "250px",
        // border: "1px solid rgb(221, 221, 221)",
        borderRadius: "10px",
        backgroundColor: "rgb(240, 240, 240)",
        marginBottom: "1rem",
        margin: "0.5rem",
        // "&:hover svg": {
        //     cursor: "pointer"
        // }
    },
    purchaseDetails: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "50%",
    },
    purchaseImage: {
        width: "100%",
        height: "50%",
        "& img": {
            width: "100%",
            height: "100%",
            borderRadius: "10px 10px 0 0",
        }
    },
    purchaseHeader: {
        padding: "0.2rem 0.2rem",
    },
    purchaseFooter: {
        padding: "0 0.3rem 0.5rem 0.3rem",
        fontSize: "14px",
        fontWeight: "300"
    },
    purchaseTitle: {
        borderRadius: "15px",
        backgroundColor: "#23775a",
        color: "white",
        width: "fit-content",
        fontSize: "14px",
        fontWeight: "300",
        padding: "1px 12px",
        margin: "3px 0px"
    },
    purchaseServiceType: {
        borderRadius: "15px",
        backgroundColor: "#29bb89",
        color: "white",
        width: "fit-content",
        fontSize: "12px",
        fontWeight: "300",
        padding: "1px 12px",
    },
}