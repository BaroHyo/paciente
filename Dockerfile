# Usa una imagen base de Node.js
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye el proyecto
RUN npm run build

# Usa una imagen de servidor estático
FROM nginx:alpine

# Copia los archivos de la construcción en la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
