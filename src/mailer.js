// Servicio de correo falso: solo imprime en consola.
function sendMail(to, subject, body) {
  console.log(`📧 Para: ${to}\nAsunto: ${subject}\n\n${body}`);
}

module.exports = { sendMail };
