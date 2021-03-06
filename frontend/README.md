# EpicTierMaker

## Introducción 
### Problema:
Necesitamos desarrollar un producto mínimo viable o una prueba de concepto de aplicación. O quizás tenemos que desarrollar el front de forma independiente mientras el back está todavía en fase de diseño.

### Alternativas:
Para replicar los datos podemos añadir manualmente datos de prueba en las diferentes vistas o servicios de la aplicación que se encargan de llamar a la API. Sin embargo, a largo plazo no es una buena idea, puesto que esos cambios habría que revertirlos en el momento de la integración. 

### Solución:
Una alternativa sencilla es JSON Server.
## Introducción a JSON Server

JSON Server es una librería que nos permite prototipar la interfaz de una API REST de forma rápida y sencilla,
sin necesidad de configurar nada más (bases de datos, entornos...).

## Instalación de JSON Server

Instalar [JSON Server](https://github.com/typicode/json-server).

```sh
npm install -g json-server
```

Crear un fichero `db.json` con datos de prueba.

```sh
  {
    "random": [
      "https://robohash.org/random1",
      "https://robohash.org/random2"
    ],
    "tierlists": [
      {
        "id": "1",
        "title": "Título 1",
        "category": "random",
        "nPictures": 25,
        "banner": "https://picsum.photos/800/500?random=1",
        "description": "Nueva descripción de la tier list nº 1.",
        "favorite": false,
        "items": [
          {
            "id": "d4da5668-b751-4de9-980c-444c1f87c99c",
            "color": "#29C289",
            "text": "Nuevo",
            "pictures": []
          },
          {
            "id": "6eb35323-2f0f-4382-84d4-b7efa12697d9",
            "color": "#10D327",
            "text": "Nuevo",
            "pictures": []
          },
          {
            "id": "5fe221dd-98b3-4e22-ba8e-660098565e23",
            "color": "#10675E",
            "text": "Nuevo",
            "pictures": []
          },
          {
            "id": "257dc06b-5b47-4c5a-bae2-08ea7e1891f9",
            "color": "#71F3D4",
            "text": "Nuevo",
            "pictures": []
          }
        ]
      },
      {
        "id": "2",
        "title": "Título 2",
        "category": "random",
        "nPictures": 20,
        "banner": "https://picsum.photos/800/500?random=2",
        "description": "Descripción de la tier list 2.",
        "favorite": true,
        "items": [
          {
            "id": "2.1",
            "color": "#ff5733",
            "text": "first",
            "pictures": []
          },
          {
            "id": "2.2",
            "color": "#996d64",
            "text": "second",
            "pictures": [
              "https://robohash.org/33sdd10",
              "https://robohash.org/33d12"
            ]
          },
          {
            "id": "2.3",
            "color": "#646699",
            "text": "third",
            "pictures": []
          },
          {
            "id": "2.4",
            "color": "#819964",
            "text": "fourth",
            "pictures": [
              "https://robohash.org/33ddsdd10",
              "https://robohash.org/3dd3d12"
            ]
          }
        ]
      },
      {
        "id": "3b096514-a152-4382-a413-e753bee8973c",
        "description": "TierList con imágenes introducidas manualmente.",
        "title": "TierList Real",
        "items": [
          {
            "id": "173fbb25-aa5d-47a7-b913-e03d34e6337e",
            "color": "#33FD8B",
            "text": "Nuevo",
            "pictures": []
          },
          {
            "id": "58ac772d-5723-4b9b-b702-3d420b59ec95",
            "color": "#3A858A",
            "text": "Nuevo",
            "pictures": []
          },
          {
            "id": "7e471dea-2511-4635-9b0b-b14497154312",
            "color": "#BA2BC5",
            "text": "Nuevo",
            "pictures": []
          },
          {
            "id": "329af9e3-87e9-428e-a106-026a3a85d99e",
            "color": "#EB6537",
            "text": "Nuevo",
            "pictures": []
          }
        ],
        "favorite": false,
        "banner": "https://material.angular.io/assets/img/examples/shiba2.jpg",
        "pictures": [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/9/91/JavaScript_screenshot.png",
          "https://codigoonclick.com/wp-content/uploads/2017/11/editores-codigo-javascript.jpg",
          "https://codigoonclick.com/wp-content/uploads/2017/11/atom-opensource-editor-javascript.gif",
          "https://codigoonclick.com/wp-content/uploads/2017/11/brackets-open-source-editor-javascript.gif"
        ]
      }
    ]
  }
```

Crear un script de npm en `package.json`.

```sh
json-server --watch ./api/db.json
```

Ejecutar el script.

```sh
npm run back
```

Probar rutas en el navegador.
Por defecto se crean los métodos GET, POST, PUT, PATCH y DELETE para cada recurso.

## Actualizar variables de entorno de desarrollo en el proyecto

Añadir ruta de la fake API en `environment.ts`.

```sh
export const environment = {
  production: false,
  API_URL: 'http://127.0.0.1:3000/api'
};
```

## Configuración básica de JSON Server

Mapear las rutas.

```sh
{
  "/*/save": "/$1",
  "/api/*": "/$1"
}
```

Actualizar script de npm en `package.json`.

```sh
json-server --watch ./api/db.json -r ./api/routes.json
```

## Testar JSON Server con Postman
Ahora vamos a testear lo que hemos hecho con Postman

### ¿Qué es Postman?
Es una aplicación para probar y crear APIs. 
En el trabajo normalmente la utilizamos para hacer pruebas en integraciones.

### Peticiones y Colecciones
Tan fácil como poner la URL y seleccionar el tipo de petición.
Se pueden añadir parámetros a las peticiones, así como diferentes tipos de autenticación.

Las colecciones sirven para poder agrupar las peticiones en un mismo entorno.
Se pueden exportar  e importar colecciones enteras.

## Configuración de la autenticación por JWT de JSON Server

Instalar [JSON Server Auth](https://www.npmjs.com/package/json-server-auth).

```sh
npm install -D json-server json-server-auth
```

Actualizar script de npm.

```sh
json-server --watch ./api/db.json -m ./node_modules/json-server-auth -r ./api/routes.json
```

Introducir un usuario de prueba en `db.json`.
Obtener contraseña hasheada con [bcrypt](https://bcrypt-generator.com/).

```sh
{
  "profile": {
    "id": "admin",
    "email": "admin@tiermaker.com"
  },
  "users": [
    {
      "id": "admin",
      "email": "admin@tiermaker.com",
      "password": "$2a$12$.fFCLsXvLe2GvN85AWkSjOENFxxUAuYfk25KuyOnTl6yMccZYDwXW"
    }
  ]
}
```

Añadir mapeo de las rutas de autenticación en `routes.json`.

```sh
{
  "/auth/*": "/$1"
}
```

## Securización de rutas en JSON Server

Añadir securización de endpoints en `routes.json`.
Más info en la [doc](https://www.npmjs.com/package/json-server-auth).

```sh
{
  "/profile*": "/660/profile$1",
  "/users*": "/660/users$1",
  "/random*": "/660/random$1",
  "/tierlists*": "/660/tierlists$1"
}
```
## Volvemos a Postman

Ahora vamos a añadir el token a las peticiones de Postman.

Post a la ruta de Login
```json
{
    "email": "admin@tiermaker.com",
    "password": "password"
}
```
La respuesta debería ser algo del estilo a:
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRpZXJtYWtlci5jb20iLCJpYXQiOjE2NDg3MjE0MjEsImV4cCI6MTY0ODcyNTAyMSwic3ViIjoiYWRtaW4ifQ.9mgSOHC5tLiurSkoS_hEKgghv12h8Xjj5HYEgH37gaI",
    "user": {
        "id": "admin",
        "email": "admin@tiermaker.com"
    }
}
```
## Tests en Postman
Pestaña Tests

Ejemplo de Get All:
```js
pm.test("Status test", () => {
    pm.expect(pm.response.code).to.be.oneOf([200, 401]);
});

pm.test("Comprobación Tipos respuesta.", () => {
    if(pm.response.code !== 401){
        let responseJson = pm.response.json();
        let jsonData = responseJson;
        jsonData.forEach( (element) => {
            pm.expect(element.id).to.be.a('string');
            pm.expect(element.description).to.be.a('string');
            if(element.banner){
                pm.expect(element.banner).to.be.a('string');
            }
            pm.expect(element.category).to.be.a('string');
            pm.expect(element.nPictures).to.be.a('number');
            pm.expect(element.title).to.be.a('string');
            pm.expect(element.items).to.be.a('array');
            if(element.items.length > 0){
                let tierToTest = element.items[0];
                pm.expect(tierToTest.id).to.be.a('string');
                pm.expect(tierToTest.color).to.be.a('string');
                pm.expect(tierToTest.text).to.be.a('string');
                pm.expect(tierToTest.pictures).to.be.a('array');
            }
            pm.expect(element.unassignedImages).to.be.a('array');
            pm.expect(element.favorite).to.be.a('boolean');
        });
    }
});
```

### Hay snippets al lado derecho que pueden ser de utilidad.

## Probando el front otra vez
Ahora que tenemos nuevamente autenticación podemos probar el front.

## Simulación de recursos anidados en JSON Server

Mockear anidamiento de recursos anidados en `routes.json`.

```sh
{
  "/*/pictures/*": "/$2"
}
```

## Operaciones avanzadas

Probar paginación de imágenes en Postman.

```sh
GET /api/pictures/random?_start=0&_limit=10
```

También se puede filtrar por atributos o añadir middlewares para preprocesar las peticiones.

## Creación de un seeder

Generar un script `seeder.json`.
Ejecutar el script.

```sh
node ./api/seeder.js
```

## Actualizar variables de entorno de producción en el proyecto

Añadir ruta de la fake API en `environment.prod.ts`.

```sh
export const environment = {
  production: true,
  API_URL: 'http://127.0.0.1:8080/api'
};
```

Probar proyecto con la API real.

```sh
ng serve --configuration production
```

## Conclusión

Para desarrollar un proyecto de front de forma independiente no hace instalar bases de datos ni
crear APIs. JSON Server te permite simular datos de escenarios reales con una configuración mínima.
