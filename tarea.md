# Recuperación de contraseña
Como usuario que olvidó su contraseña, quiero recibir un enlace por correo
para crear una nueva.

Criterios:
- POST /auth/forgot recibe un email
- El enlace expira
- POST /auth/reset cambia la contraseña
