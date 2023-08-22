// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { parseColor } = require('tailwindcss/lib/util/color'); // eslint-disable-line import/no-extraneous-dependencies

/* Converts HEX color to RGB */
const toRGB = value => parseColor(value)?.color?.join(', ');

const isCustomGroup = colorGroup =>
  [
    '-primary',
    '-secondary',
    '-tertiary',
    '-success',
    '-warning',
    '-danger',
  ].includes(colorGroup);

function exposeColorsAsCssVariables({ addBase, theme }) {
  function extractColorVars(colorObj, colorGroup = '') {
    const getColours = (vars, colorKey) => {
      const value = colorObj[colorKey];
      const cssVariable =
        colorKey === 'DEFAULT'
          ? `--color${colorGroup}`
          : `--color${colorGroup}-${colorKey}`;

      const rgbVars = isCustomGroup(colorGroup)
        ? { [`${cssVariable}-rgb`]: toRGB(value) }
        : {};

      const newVars =
        typeof value === 'string'
          ? { [cssVariable]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars, ...rgbVars };
    };

    return Object.keys(colorObj).reduce(getColours, {});
  }

  addBase({
    ':root': extractColorVars(theme('colors')),
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          // https://www.tailwindshades.com/#color=211.76470588235293%2C100%2C16.666666666666664&step-up=11&step-down=7&hue-shift=0&name=prussian-blue&base-stop=8&v=1&overrides=e30%3D
          DEFAULT: '#002855',
          50: '#FBFDFF',
          100: '#DFEEFF',
          200: '#A7D0FF',
          300: '#6EB3FF',
          400: '#3695FF',
          500: '#0077FD',
          600: '#005DC5',
          700: '#00428D',
          800: '#002855',
          900: '#001731',
          950: '#000F1F',
        },

        secondary: {
          // https://www.tailwindshades.com/#color=175.0259067357513%2C88.9400921658986%2C57.45098039215686&step-up=9&step-down=12&hue-shift=0&name=bright-turquoise&base-stop=5&v=1&overrides=e30%3D
          DEFAULT: '#32F3E3',
          50: '#F5FEFE',
          100: '#DFFDFB',
          200: '#B4FBF5',
          300: '#89F8EF',
          400: '#5DF6E9',
          500: '#32F3E3',
          600: '#0DDBCA',
          700: '#09A195',
          800: '#06675F',
          900: '#032E2A',
          950: '#01110F',
        },

        tertiary: {
          // https://www.tailwindshades.com/#color=37.02127659574467%2C100%2C53.92156862745098&step-up=9&step-down=11&hue-shift=0&name=sun&base-stop=5&v=1&overrides=e30%3D
          DEFAULT: '#FFA514',
          50: '#FFF4E3',
          100: '#FFEBCC',
          200: '#FFDA9E',
          300: '#FFC870',
          400: '#FFB742',
          500: '#FFA514',
          600: '#DB8700',
          700: '#A36400',
          800: '#6B4200',
          900: '#331F00',
          950: '#170E00',
        },

        success: {
          // https://www.tailwindshades.com/#color=128.25396825396825%2C100%2C32&step-up=8&step-down=11&hue-shift=0&name=fun-green&base-stop=7&v=1&overrides=e30%3D
          DEFAULT: '#00A316',
          50: '#ADFFB9',
          100: '#99FFA7',
          200: '#70FF84',
          300: '#47FF61',
          400: '#1FFF3D',
          500: '#00F522',
          600: '#00CC1C',
          700: '#00A316',
          800: '#006B0F',
          900: '#003307',
          950: '#001703',
        },

        warning: {
          // https://www.tailwindshades.com/#color=48.48214285714286%2C100%2C43.92156862745098&step-up=8&step-down=11&hue-shift=0&name=corn&base-stop=6&v=1&overrides=e30%3D
          DEFAULT: '#E0B500',
          50: '#FFF3C1',
          100: '#FFEFAD',
          200: '#FFE784',
          300: '#FFE05B',
          400: '#FFD833',
          500: '#FFD00A',
          600: '#E0B500',
          700: '#A88800',
          800: '#705A00',
          900: '#382D00',
          950: '#1C1600',
        },

        danger: {
          // https://www.tailwindshades.com/#color=0%2C85.36585365853658%2C59.80392156862745&step-up=8&step-down=11&hue-shift=0&name=flamingo&base-stop=5&v=1&overrides=e30%3D
          DEFAULT: '#F04141',
          50: '#FDEBEB',
          100: '#FCD8D8',
          200: '#F9B2B2',
          300: '#F68D8D',
          400: '#F36767',
          500: '#F04141',
          600: '#E71212',
          700: '#B30E0E',
          800: '#7F0A0A',
          900: '#4B0606',
          950: '#310404',
        },
      },
    },
  },
  plugins: [exposeColorsAsCssVariables],
};
