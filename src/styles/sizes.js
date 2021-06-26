export default {
    up() {

    },
    down(size) {
        const sizes = {
            xs: "575.98px",
            sm: "790.98px",
            md: "991.98px",
            lg: "1230px",
            xl: "1400.98px",
            xxl: "1600px",
            xxxl: "1870px"
        }
        return `@media (max-width: ${sizes[size]})`
    }
}