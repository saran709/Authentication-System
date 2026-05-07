FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
# Ensure Vite preview binds to all interfaces so host can access the container
CMD ["npx", "vite", "preview", "--port", "5173", "--host", "0.0.0.0"]
