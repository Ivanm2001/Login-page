# Login Page

## Descripción

Este proyecto contiene una página de login que te permite registrarte, iniciar sesión y cerrar sesión.

## Tecnologías Usadas
- **Lenguajes**:
  - HTML.
  - CSS.
  - JavaScript.
- **Herramientas**:
  - Node.js: Para el desarrollo del backend.
  - Docker: Para la contenerización de la aplicación y facilitar la configuración del entorno.
  - Embedded JavaScript.
- **Base de Datos**:
  - PostgreSQL.

## Instalación
1. Clona el repositorio:
    - `git clone https://github.com/Ivanm2001/full_stack_test_exercise.git`
     
2. Navega al directorio del proyecto:
   - `cd nombre-del-repositorio`

3. Crea un archivo `.env` en el root de la app y escribe el siguiente código: 

      - db_user=postgres
      - db_host=db
      - db_database=postgres
      - db_password=3009
      - db_port=5432
      - secret_phrase=phrase123
      - expires=7d
      - cookie_expires=1


4. Docker:
- Instala Docker Desktop.

## Uso
- Una vez instalado Docker Desktop, ábrelo.
- Luego de abrir Docker Desktop, ejecuta `docker-compose up` en el directorio del programa. Esto se encargará de descargar las dependencias de Node necesarias y de configurar la base de datos.
- Luego de ejecutar este comando, podemos acceder a la página entrando a `http://localhost:3000/`.
- Cuando termines de usar esta aplicación, puedes cerrarla presionando `Ctrl + C` en la terminal y luego ejecutando `docker-compose down`.

# Documentación de la API 

## Endpoints: 
1. Registro de usuario: 
 - **URL**: `/api/register`
 - **Método**: POST
 - **Parámetros (Cuerpo del request)**:
   ```javascript
   {
     "email": "string",  // email de usuario
     "password": "string",  // Contraseña
     "repeat_password": "string" // Repetir contraseña para confirmación
   }
   ```
 - **Ejemplo respuesta exitosa**:
   ```javascript
   {
     "status": "Successful",
     "message": "The email user@example.com was added.",
     "redirect": "/"
   }
   ```
 - **Ejemplo respuesta fallida**:
   ```javascript
   {
     "status": "Error",
     "message": "A user with this email already exists."
   }
   ```
   
2. Login de usuario: 
 - **URL**: `/api/login`
 - **Método**: POST
 - **Parámetros (Cuerpo del request)**:
   ```javascript
   {
     "email": "string",  // email de usuario
     "password": "string"  // Contraseña
   }
   ```
 - **Ejemplo respuesta exitosa**:
   ```javascript
   {
     "status": "ok",
     "message": "User logged in.",
     "redirect": "/main"
   }
   ```
 - **Ejemplo respuesta fallida**:
   ```javascript
   {
     "status": "Error",
     "message": "A user with this email does not exist."
   }
   ```
   
3. Obtener página de inicio (Login):
 - **URL**: `/`
 - **Método**: GET
 - **Autenticación**: Este endpoint verifica si el usuario está logueado a través de la función `authorization.AmILoggedIn`.
 - **Ejemplo de solicitud**: 
   ```
   GET http://localhost:3000/
   ```

4. Obtener página de registro:
 - **URL**: `/register`
 - **Método**: GET
 - **Autenticación**: Este endpoint verifica si el usuario está logueado a través de la función `authorization.AmILoggedIn`.
 - **Ejemplo de solicitud**: 
   ```
   GET http://localhost:3000/register
   ```

5. Obtener página de administrador (Main):
 - **URL**: `/main`
 - **Método**: GET
 - **Autenticación**: Este endpoint verifica si el usuario está logueado a través de la función `authorization.goToMain`.
 - **Ejemplo de solicitud**: 
   ```
   GET http://localhost:3000/main
   ```

    


