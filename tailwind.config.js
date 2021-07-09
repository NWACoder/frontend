module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                indigo: '#B5EAEA',
            },
            boxShadow: {
                inner: 'inset 2px 4px 0 0 rgba(255, 255, 255, .5)',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
