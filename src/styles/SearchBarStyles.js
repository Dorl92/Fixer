import sizes from './sizes';

export default {
    searchBar: {
        display: "flex",
        fontSize: props => (props.navbar ? "14px" : "18px"),
        height: props => (props.navbar ? "30px" : "44px"),
        borderRadius: "4px",
        // width: "fit-content",
        zIndex: "3",
        [sizes.down("sm")]: {
            height: props => (props.navbar ? "30px" : "38px"),
        },
    },
    searchIcon: {
        color: "gray",
        background: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 0.5rem",
        borderRadius: "4px 0  0 4px",
    },
    input: {
        transition: "all 0.3s ease-in-out",
        "& input": {
            border: "none",
            outline: "none",
            height: props => (props.navbar ? "28px" : "42px"),
            width: props => (props.navbar ? "220px" : "350px"),
            paddingLeft: "5px",
            fontSize: props => (props.navbar ? "14px" : "18px"),
        },
        [sizes.down("sm")]: {
            "& input":{
                height: props => (props.navbar ? "30px" : "36px"),
                width: props => (props.navbar ? "220px" : "240px"),
            }
        },
    },
    searchButton: {
        backgroundColor: "#23775a",
        color: "white",
        fontSize: props => (props.navbar ? "14px" : "18px"),
        fontWeight: "300",
        outline: "none",
        border: "none",
        padding: props => (props.navbar ? "5px 15px" : "10px 30px"),
        borderRadius: "0 4px 4px 0",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            backgroundColor: "#164736",
        },
    },
    noSuggestions: {
        border: "1px solid rgb(240, 240, 240)",
        listStyle: "none",
        marginTop: "0",
        maxHeight: "143px",
        overflowY: "auto",
        paddingLeft: "0",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "0 0 4px 4px",
        zIndex: "3",
        "& li": {
            padding: "0.5rem 1.5rem",
            transition: "all 0.1s ease-in-out",
            zIndex: "3",
        },
    },
    suggestions: {
        border: "1px solid rgb(240, 240, 240)",
        listStyle: "none",
        marginTop: "0",
        maxHeight: "143px",
        overflowY: "auto",
        paddingLeft: "0",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "0 0 4px 4px",
        zIndex: "3",
        "& li": {
            padding: "0.5rem 1.5rem",
            transition: "all 0.1s ease-in-out",
            zIndex: "3",
            "&:hover": {
                backgroundColor: "rgb(250, 250, 250)",
                cursor: "pointer",
            }
        },
    }
}