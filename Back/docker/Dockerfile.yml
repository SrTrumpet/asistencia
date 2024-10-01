FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias usando npm ci para producción
RUN npm ci

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Construye el proyecto
RUN npm run build

# Expone el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Comando para iniciar la aplicación en producción
CMD ["npm", "run", "start:prod"]