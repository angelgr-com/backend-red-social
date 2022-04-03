Backend Red Social Foro Food

Este proyecto realizado en conjunto en GeeksHubs Academy consiste en la realización de un BackEnd para nuestra APP Foro Food. 

Hemos utilizado Mongo, Atlas ... etc MIRAR ESTA LINEA

-----------------------------------------------------------------------------------------------------------------------------------------------------

Pre-requisitos 📋
Necesitaremos la instalación de un programa para realizar nuestro código, en este proyecto se ha utilizado Visual studio code,

-----------------------------------------------------------------------------------------------------------------------------------------------------

Tecnologías utilizadas 🚀
El proyecto ha sido desarrollado utilizando los siguientes paquetes en Nodejs:

Axios
Bcryptjs
Cors
Dotenv
Express
Jsonwebtoken
Mongoose
Nodemon

-----------------------------------------------------------------------------------------------------------------------------------------------------

¿Cómo desplegar el proyecto? 

Las siguientes instrucciones permiten obtener una copia local del proyecto para investigación de códgio o de desarollo:

- Para clonar el repositorio localmente usar el comando: git clone  + url del repositorio 

- Para instalar las dependencias necesarias usar el comando: npm i

- Para rellenar las variables necesarias en estos archivos para iniciar el proyecto:

MIRAR ESTA LINEA
- config.example.json -> Incluir campos Username, Password, Database

- Para crear la base de datos usar el comando: sequelize db:create

- Para ejecutar las migraciones usar el comando: sequelize db:migrate

- Para ejecutar los seeders usar el comando: sequelize db:seed:all

...ya está listo el back-end de FORO FOOD!

-----------------------------------------------------------------------------------------------------------------------------------------------------

Modelo de la base de datos 🔧
El diagrama de nuestra base de datos:

foto

-----------------------------------------------------------------------------------------------------------------------------------------------------

Funcionalidad de la APP 🛠️
El sistema puede realizar las siguientes acciones:

CRUD Hilos.
CRUD Comentarios.
CRUD Usuarios.
Encriptación de campos mediante Bcryptjs.
Proceso de autenticación mediante jsonwebtoken.
El sistema permite administrar a los usuarios por roles.
Registro mediante formulario.
Acceso mediante formulario.

-----------------------------------------------------------------------------------------------------------------------------------------------------

Funcionalidad de los endpoints 🛠️
El sistema puede realizar las siguientes acciones:

TREADS

// POST newThread
// GET getThread
// GET getAllThreads
// GET threadsByTheme
// PUT editThread
// DEL deleteThread
// GET geComments
// PUT newComment
// PUT editComment
// DEL deleteComment
// GET likesFromComments
// PUT newLike


USERS
// POST register
// POST login
// GET find
// PUT update
// DEL delete
// PUT userFollows
// PUT addFollower
// GET following
// GET followers

-----------------------------------------------------------------------------------------------------------------------------------------------------

Autores ✒️
Angel Garrigues  https://github.com/angelgr-com/
Rafa Orti https://github.com/RafaelOrti
Rodrigo Campos https://github.com/RCD1985-GT