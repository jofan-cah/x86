# Gunakan node versi 18 sebagai base image
FROM node:20

# Atur working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Salin semua file ke working directory
COPY . .

# Ekspos port aplikasi
EXPOSE 3090

# Jalankan aplikasi
CMD ["node", "index.js"]
