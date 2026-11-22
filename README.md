# EcoNet Backend

Backend de EcoNet, desarrollado con [NestJS](https://nestjs.com/) y TypeScript. El proyecto organiza sus funcionalidades en módulos para usuarios, comunidades y comentarios.


## Requisitos

- Node.js y npm.

## Instalación

Cloná el repositorio y ejecutá:

```bash
npm install
```

## Configuración

La aplicación escucha en el puerto `3000` de forma predeterminada. Para usar otro puerto, definí la variable de entorno `PORT`.

La instrumentación con NestJS Observe utiliza estas variables:

- `OBSERVE_APP_KEY`
- `OBSERVE_APP_SECRET`

Configurá ambas variables en el entorno donde se ejecute la aplicación. Si no están definidas, el módulo utiliza valores de ejemplo; para habilitar la observabilidad, reemplazalos por las credenciales de una aplicación de [NestJS Observe](https://observe.nestjs.com/).

## Ejecución

```bash
# Compilar
npm run build

# Desarrollo
npm run start

# Desarrollo con recarga automática
npm run start:dev

# Desarrollo con depurador
npm run start:debug

# Producción (requiere compilar previamente)
npm run start:prod
```

## Módulos y endpoints

Los módulos de la aplicación se registran desde `src/modules/App/app.module.ts`.

- **Usuarios (`/users`)**: permite crear, listar, consultar, actualizar y eliminar usuarios mediante Prisma.
- **Comunidades (`/comunidades`)**: permite crear, listar, consultar, actualizar y eliminar comunidades mediante Prisma.
- **Comentarios (`/comentarios`)**: permite crear, listar, consultar, actualizar y eliminar comentarios mediante Prisma.

Los servicios de los tres módulos usan Prisma para persistir datos en PostgreSQL. La configuración requiere `DATABASE_URL`.

## Validación de solicitudes

La aplicación configura un `ValidationPipe` global. Los DTO de creación validan los datos recibidos:

- **Usuario**: `nombre` (texto obligatorio), `email` (formato de correo) y `password` (texto de al menos 8 caracteres).
- **Comunidad**: `nombre`, `descripcion`, `actividad` y `contacto` (textos obligatorios).
- **Comentario**: `nombre` (texto obligatorio), `email` (formato de correo) y `mensaje` (entre 2 y 200 caracteres).

Los DTO de actualización permiten enviar campos parciales. El `ValidationPipe` global aplica las validaciones de los DTO utilizados por los endpoints.

## Pruebas y calidad

```bash
# Ejecutar pruebas
npm test

# Ejecutar pruebas de extremo a extremo
npm run test:e2e

# Generar reporte de cobertura
npm run test:cov

# Revisar el código con el linter
npm run lint

# Formatear los archivos TypeScript
npm run format
```

## Observabilidad

El proyecto utiliza [NestJS Observe](https://observe.nestjs.com/) para instrumentar la aplicación. Para conectar una cuenta, seguí las instrucciones de configuración de Observe y definí `OBSERVE_APP_KEY` y `OBSERVE_APP_SECRET` en el entorno de ejecución.

## Despliegue

Antes de desplegar, compilá la aplicación con `npm run build` y configurá las variables de entorno necesarias, como `PORT` y las credenciales de Observe.

Consultá la [documentación de despliegue de NestJS](https://docs.nestjs.com/deployment) para obtener más información.
