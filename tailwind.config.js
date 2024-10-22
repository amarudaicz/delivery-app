/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true, // Centrar automáticamente el contenedor
      padding: '2rem', // Añadir padding global
      screens: {
        sm: '100%', // Sobrescribir el tamaño del contenedor en pantallas pequeñas
        md: '640px',
        lg: '800px', // Modificar el tamaño en pantallas grandes
        xl: '960px',
        '2xl': '1200px', // Sobrescribir para pantallas extra grandes
      },
    }, 
    extend: {},
  },
  plugins: [],
}

