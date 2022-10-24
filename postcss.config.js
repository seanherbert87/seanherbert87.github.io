module.exports = {
  plugins: {
    postcss: process.env.NODE_ENV === 'production' ? {} : false,
    tailwindcss: {},
    autoprefixer: {},
  },
}