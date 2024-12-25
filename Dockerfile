# Используем официальный образ Node.js 18 в качестве базового образа для контейнера
FROM node:18

# Указываем рабочий каталог для приложения внутри контейнера
WORKDIR /app

# Копируем пакетные файлы. В них сведения о зависимостях приложения
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы в рабочую директорию контейнера
COPY . . 

# Указываем команду для запуска приложения
CMD ["node", "index.js"]

# Открываем порты, в моем случае здесь используется переменная из .env
EXPOSE ${PORT}
