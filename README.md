# Login Page

## Descripcion 

Este proyecto contiene una pagina de login que te permite registrarte, iniciar sesion y cerrar sesion.

## Tecnologías Usadas
- **Lenguajes**:
  - HTML. 
  - CSS.
  - JavaScript.
- **Herramientas**:
  - Node.js: Para el desarrollo del backend.
  - Docker: Para la contenerización de la aplicación y facilitar la configuración del entorno.
  - Embedded Javascript.
- **Base de Datos**:
  - PostgreSQL.

## Instalación
1. Clona el repositorio:
    - git clone https://github.com/Ivanm2001/Login-page.git
     
2. Navega al directorio del proyecto:
   - cd nombre-del-repositorio

3. Crea un archivo .env en el root de la app y escribe el siguiente codigo: 
      - db_user=postgres
      - db_host=db
      - db_database=postgres
      - db_password=3009
      - db_port=5432
      - secret_phrase=phrase123
      - expires=7d
      - cookie_expires=1

4. Docker:
   - Instalar Docker Desktop.
   
  
## Uso
  - Una vez instalado docker desktop, ejecutar "docker-compose up" en el directorio del programa". Esto se encargara de descargar las dependencias de Node necesarias y de configurar la base de datos.
  - Luego de ejecutar este comando, podemos acceder a la pagina entrado a http://localhost:3000/
  - Cuando terminemos de usar esta aplicacion, podemos cerrarla presionando Ctrl + C en la terminal y luego ejecutando "docker-compose down"


# Documentacion de la API 

## Endpoints: 
   1. Registro de usuario: 
        - URL: /api/register
        - Metodo: POST
        - Parametros (Cuerpo del request):
           ```javascript
          {
            "email": "string",  // email de usuario
            "password": "string",  // Contraseña
            "repeat_password": "string" // Repetir contraseña para confimarcion
          }
        - Ejemplo respuesta exitosa:
          ```javascript
          {
            status: "Succesfull",
            message: "the email user@example.com was added.",
            redirect: "/",
          }
        - Ejemplo respuesta fallida:
          ```javascript
          {
            status: "Error",
            message: "An user with this email already exists.",
          }
          
   2. Login de usuario: 
        - URL: /api/login
        - Metodo: POST
        - Parametros (Cuerpo del request):
           ```javascript
          {
            "email": "string",  // email de usuario
            "password": "string",  // Contraseña
          }
        - Ejemplo respuesta exitosa:
          ```javascript
          {
            status: "ok",
            message: "User logged.",
            redirect: "/main",
          }
        - Ejemplo respuesta fallida:
          ```javascript
          {
            status: "Error",
            message: "An user with this email already exists.",
          }
   3. Obtener pagina de inicio (Login):
        - URL: /
        - Metodo: GET
        - Auntenticacion: Este endpoint verifica si el usuario esta logueado a traves de la funcion authorization.AmILoggedIn
        - Ejemplo de solicitud: 
            GET http://localhost:3000/
   
   4. Obtener pagina de registro:
        - URL: /register
        - Metodo: GET
        - Auntenticacion: Este endpoint verifica si el usuario esta logueado a traves de la funcion authorization.AmILoggedIn
        - Ejemplo de solicitud: 
            GET http://localhost:3000/register
    
   5. Obtener pagina de administrador (Main):
        - URL: /main
        - Metodo: GET
        - Auntenticacion: Este endpoint verifica si el usuario esta logueado a traves de la funcion authorization.goToMain
        - Ejemplo de solicitud: 
            GET http://localhost:3000/main
    


