# React Express Social App :metal:

## Основные возможности приложения

- Регистрация/авторизация пользователей
- Добавление/удаление друзей
- Добавление/удаление постов
- Личные сообщения
- Изменение информации о пользователе в настройках

## Структура проекта

```
- client - клиент
  - public
    - index.html - шаблон разметки
    - ...
  - src
    - modules
      - components
        - Aside.jsx
        - Dialog.jsx
        - Friend.jsx
        - Message.jsx
        - Navbar.jsx
        - Person.jsx
        - Post.jsx
        - Userwall.jsx
        - WallPostForm.jsx
      - context
        - GlobalContext.jsx
      - pages
        - Client.jsx
        - DialogPage.jsx
        - Friends.jsx
        - Loginform.jsx
        - Messenger.jsx
        - People.jsx
        - Registerform.jsx
        - Settings.jsx
        - UserPage.jsx
      - utils
        - Loader.jsx
        - Routes.jsx
        - socket.js
    - store
      - mainStore.js
      - userStore.js
      - formStore.js
      - clientStore.js
    - styles
    - App.js - основной компонент приложения
    - index.js - главный файл клиента, точка входа
  - ...
- server
  - index.js
  - controllers
    - mainController.js
    - messengerController.js
    - userController.js
    - socketController.js
  - middleware
    - auth.middleware.js
    - cors.middleware.js
  - models
    - Dialog.js
    - Message.js
    - User.js
    - WallPost.js
  - routes
    - mainRouter.js
    - messengerRouter.js
    - socketRouter.js
    - userRouter.js
```

## Стек технологий

_Сервер_:

- Express server
- Mongoose
- JSON Web Token
- Bcrypt
- Socket.io

_Клиент_:

- React
- MobX
- Socket.io-client
- Material UI

## Запуск приложения

Для запуска приложения необходимо сделать следующее:

- Клонировать репозиторий

```js
git clone https://github.com/Alexkon30/React-Express-Social-App.git
```

- Установить зависимости сервера и клиента

```bash

cd client
npm i

cd ../server
npm i
```

- Создать базу данных в MongoDB Atlas (MongoDB Cloud)
- Создать директорию `config` в директории проекта `server` с файлом `default.json` для хранения MongoDB URI, "соли" для шифрования пароля и номера порта для сервера

```js
module.exports = {
  serverPort: 5000,
  dbUrl:
    'mongodb+srv://<username>:<password>@cluster0.pscjo.mongodb.net/<dbname>?retryWrites=true&w=majority',
  secret: 'secret',
};
```
