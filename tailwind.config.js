/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '12px'
        },
        extend: {
            colors: {
                beige: '#EFECE7',
                borderGrey: '#9B9893',
                darkGrey: '#707070',
                //blue
                babyBlue: '#E2EDFA',
                navy: '#03438D',
                grass: '#83C51D',
                gold: '#FAA722',
                apple: '#DE4B63'
            },
            spacing: {
                22: '22px',
                30: '30px',
                46: '46px',
                50: '50px'
            },
            boxShadow: {
                listItem: '0 3px 0 rgba(0, 0, 0, 1)',
                button: '-5px 5px 0px 0px rgba(0, 0, 0, 1)'
            },
            borderRadius: {
                default: '10px'
            }
        }
    },

    plugins: []
};
