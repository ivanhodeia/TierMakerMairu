# EpicTierMaker

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

## Simulación de recursos anidados en JSON Server

Mockear anidamiento de recursos anidados en `routes.json`.

```sh
{
  "/*/pictures/*": "/$2"
}
```

## Creación de un seeder

Generar un script `seeder.json`.
Ejecutar el script.

```sh
node ./api/seeder.js
```
