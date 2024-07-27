// Importar yargs
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

// Importar nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER, // Usa variables de entorno para mayor seguridad
        pass: process.env.EMAIL_PASS, // Usa variables de entorno para mayor seguridad
    },
});

// Obtener argumentos de la línea de comandos
const { PORT, name, modo, _ } = yargs(hideBin(process.argv))
    .alias('p', 'PORT')
    .default('p', 8080)
    .alias('n', 'name')
    .default('n', 'default@example.com') // Cambia a un valor genérico
    .alias('m', 'modo')
    .default('m', 'CLUSTER')
    .argv;

// Exportar los valores necesarios
module.exports = {
    PORT,
    name,
    transporter,
    modoCluster: modo,
};
