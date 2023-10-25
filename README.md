# cloud_mix

## Приложение содержит в себе функционал поиска собеседников, обмена сообщениями с собеседниками в реальном времени, а также AI ассистента


## Установка проекта:
## 2. Установите зависимости с помощью ```npm i```
## 3. Создайте .env файл со следующими переменными:
 ### VITE_REACT_APP_OPENAI_API_KEY={gtp_api_key}
  ### VITE_REACT_APP_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
  ### VITE_REACT_APP_API_BASE_URL=http://localhost:4000
## 4. Запустите локально проект с помощью ```npm run dev```
## 5. В проекте настроен husky pre-commit hook, а также среда для написания тестов (jest + react testing library)
## 6. Используется atomic design подход
## 7. Основные маршруты:
### / Страница регистрации
### /login - Страница авторизации
### chat - Страница с чатами
### /chat/:id - конкретный чат
