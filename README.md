# Primer Parcial – Sistema de Gestión de Proyectos de Software

API REST para gestionar proyectos de software, sus líderes y las tecnologías que utilizan. Desarrollada con Node.js, Express y Sequelize (MySQL), con autenticación mediante JWT almacenado en una cookie httpOnly.

## Tecnologías utilizadas

- Node.js y Express
- Sequelize y MySQL (mysql2)
- express-validator
- bcrypt y jsonwebtoken
- cookie-parser y cors

## Instalación y configuración

1. Clonar el repositorio: git clone

2. Instalar las dependencias: npm install

3. Crear el archivo .env en la raíz del proyecto, tomando como base .env.example, y completar los valores

4. Crear la base de datos en MySQL

5. Iniciar el servidor: npm run dev

6. Importar en Postman la colección provista para probar los endpoints. Primero hay que registrarse e iniciar sesión, ya que la sesión se guarda en la cookie token.

## Endpoints

### Auth

- **POST** /api/auth/register Acceso: público. Registra un usuario y crea su profile.
- **POST** /api/auth/login Acceso: público. Inicia sesión y guarda el token en una cookie.
- **POST** /api/auth/logout Acceso: sesión iniciada. Cierra la sesión eliminando la cookie.

### Projects

- **POST** /api/projects Acceso: sesión iniciada. Crea un proyecto y le asocia sus technologies.
- **GET** /api/projects Acceso: administrator. Lista todos los proyectos con su líder y sus technologies.
- **GET** /api/projects/my-projects Acceso: sesión iniciada. Lista los proyectos del usuario logueado.
- **PUT** /api/projects/:id Acceso: líder del proyecto. Edita un proyecto y sus technologies.
- **DELETE** /api/projects/:id Acceso: líder del proyecto. Elimina un proyecto.

### Users

- **GET** /api/users Acceso: administrator. Lista todos los usuarios con su profile y sus proyectos.
- **DELETE** /api/users/:id Acceso: administrator. Elimina lógicamente un usuario.

### Technologies

- **POST** /api/technologies Acceso: administrator. Crea una technology.
- **GET** /api/technologies Acceso: sesión iniciada. Lista todas las technologies con sus proyectos.
- **DELETE** /api/technologies/:id Acceso: administrator. Elimina una technology.
