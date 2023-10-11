module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "weather-primary": "#00668A",
                "weather-secondary": "#004E71",
            },
        },
        fontFamily: {
            Roboto: ["Roboto, sans-serif"],
        },
        screens: {
            sm: "640px",
        },
    },
    plugins: [],
};