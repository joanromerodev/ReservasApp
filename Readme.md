# Aplicación de Reservas (Booktanium)

Booktanium es una aplicación de reservas que permite la creación, actualización y eliminación de las reservas de un cliente.

## Tecnologías Utilizadas

**Patron Arquitectura:** Cliente-Servidor

**Cliente:** React, TailwindCSS

**Servidor:** Node, Express

## Como Usar o Instalar

Primero, verificar que la ultima versión de **Node** está instalada en su dispositivo. Para ello, puede correr el siguiente comando en consola:

```bash
  node -v
```

Si no está instalado Node en su computadora, puede hacerlo descargandolo desde el sitio oficial: **[Descargar Node](https://nodejs.org/en/download/prebuilt-installer/current)**

Una vez confirmados los requisitos previos, descarga o clona este repositorio (_incluyendo cliente y servidor_). Aquí la ruta del repositorio: **[Booktanium](https://github.com/joanromerodev/ReservasApp)**

Luego, entra a cada carpeta e instala las dependencias de Node:

```bash
  cd cliente
  npm install
```

```bash
  cd servidor
  npm install
```

Una vez instaladas, lo unico que hay que hacer en la consola de cada ruta (cliente y servidor) es correr el siguiente comando que iniciara el servidor y el cliente en ambiente de desarrollo:

```bash
  npm run dev
```

Una vez iniciados ambos entornos, procederemos a abrir la ruta del cliente en el localhost.

**Importante:** Los puertos por defecto de esta aplicación son 5173 para React (_cliente_) y 4080 para Node (_servidor_). Si por algún motivo el puerto del servidor está ocupado, actualizar la constante port en el codigo del servidor y del cliente al puerto habilitado.

Ejemplo Servidor:

```javascript
const port = 4080; //Anterior
const port = { puertoDisponible }; //Nuevo
```

Ejemplo Servidor:

```javascript
const port = 4080; //Anterior
const port = { puertoDisponible }; //Nuevo
```

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## License

[MIT](https://github.com/joanromerodev/ReservasApp/blob/main/LICENSE)
