# Client Gateway

El gateway es el punto de comunicacion entre nuestros clientes y microservicios. Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver las respuestas.

# Dev

1. Clonar el repo
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `.env.template`.
4. Levantar el servidor de NATS

   ```
   docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
   ```

   This server run on the path :

   ```
   http://localhost:8222/

   ```

5. Tener levantados los microservicios
6. Levantar proyecto con `yarn start:dev`
