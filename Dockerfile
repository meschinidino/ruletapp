# --- Etapa 1: El Constructor ---
# Usamos una imagen de Node.js para instalar dependencias y construir el proyecto
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias e instalamos
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY .. .

# Ejecutamos el script de build de Next.js
# Gracias a 'output: "export"', esto creará la carpeta /out con los archivos estáticos
RUN npm run build

# --- Etapa 2: El Servidor Final ---
# Usamos una imagen de Nginx súper ligera para servir los archivos
FROM nginx:stable-alpine AS runner

# Copiamos los archivos estáticos construidos en la etapa anterior a la carpeta pública de Nginx
COPY --from=builder /app/out /usr/share/nginx/html

# Exponemos el puerto 80, que es el puerto por defecto de Nginx
EXPOSE 80

# Comando para iniciar el servidor Nginx cuando el contenedor se inicie
CMD ["nginx", "-g", "daemon off;"]