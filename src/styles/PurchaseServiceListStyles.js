import sizes from './sizes';

export default {
    purchases: {
        display: "flex",
        width: "80%",
        justifyContent: "center",
        flexDirection: "column",
        [sizes.down("xl")]: {
            width: "70%",
        },
        [sizes.down("lg")]: {
            width: "90%",
        }
    }
}