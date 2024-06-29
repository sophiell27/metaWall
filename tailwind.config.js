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
                fogBlue: '#A8B0B9',
                navy: '#03438D',
                grass: '#83C51D',
                sunshine: '#EEC32A',
                gold: '#FAA722',
                pinkOrange: '#F57375',
                apple: '#DE4B63'
            },
            spacing: {
                '22px': '22px',
                '30px': '30px',
                '46px': '46px',
                '50px': '50px',
                '72px': '72px'
            },
            boxShadow: {
                listItem: '0 3px 0 rgba(0, 0, 0, 1)',
                button: '-5px 5px 0px 0px rgba(0, 0, 0, 1)'
            },
            borderRadius: {
                default: '10px'
            },
            fontSize: {
                '60px': [
                    '60px',
                    {
                        lineHeight: '84px'
                    }
                ]
            }
        }
    },

    plugins: []
};
