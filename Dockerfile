# 1️⃣ Use official Node image
FROM node:18

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of project files
COPY . .

# 6️⃣ Expose port
EXPOSE 5000

# 7️⃣ Start server
CMD ["node", "server.js"]