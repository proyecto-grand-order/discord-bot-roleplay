
# Discord Roleplay Bot

test

Un bot de discord para un servidor, consiste en crear habilidades!

Estas en la rama de **produccion**


## Agradecimientos
 - [Discord.js  Guide](discordjs.guide)
 - [Discord.js  Docs](Discord.js.org/#/)


## Environment Variables

Para ejecutar este proyecto, tendrá que añadir las siguientes variables de entorno a su archivo .env o servidor

`token` - Discord Bot Token

`redisUri` - Redis uri.


## Requisitos
- Tener una base de datos redis

## Instalacion

Antes de empezar a instalar tenemos que tener claro dos cosas,
cuado usamos el entorno de desarrollo hace uso de `dotenv` (usa el archivo .env) es decir que cuando
lo subas a tu servidor asegurate de tener todas las variables de entornos!

Instalamos las dependencias:
```bash
npm install
```

Despues podemos iniciar el bot en dos tipos de entornos!

Para desarrollo
```bash
npm run dev
```

Para produccion
```bash
npm start
```
