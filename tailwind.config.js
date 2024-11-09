/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true, // Centrar automáticamente el contenedor
      padding: '10px', // Añadir padding global

      screens: {
        sm: '100%', // Sobrescribir el tamaño del contenedor en pantallas pequeñas
        md: '640px',
        lg: '800px', // Modificar el tamaño en pantallas grandes
        xl: '960px',
      },
    }, 
    extend: {},
  },
  plugins: [],
}

