# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto que usa tu aplicación
EXPOSE 10000

# Comando para iniciar la aplicación en el contenedor
CMD ["npm", "start"]