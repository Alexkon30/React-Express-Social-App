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
    - App.js - основной компонент приложения
    - index.js - главный файл клиента, точка входа
    - modules
      - components
        - Aside.jsx - панель навигации по сайту
        - Dialog.jsx - карточка диалога на странице мессенджера
        - Friend.jsx - карточка друга на странице друзей
        - Message.jsx - карточка сообщения на странице диалога
        - Navbar.jsx - верхняя панель с логотипом и кнопками
        - Person.jsx - карточка пользователя на странице поиска пользователей
        - Post.jsx - карточка поста
        - Userwall.jsx - стена пользователя с постами
        - WallPostForm.jsx - форма для создания поста на стене пользователя
      - context
        - GlobalContext.jsx
      - pages
        - Client.jsx - страница пользователей
        - DialogPage.jsx - страница диалога
        - Friends.jsx - страница друзей
        - Loginform.jsx - страница авторизации
        - Messenger.jsx - страница со списком диалогов
        - People.jsx - страница с пользователями сети
        - Registerform.jsx - страница регистрации
        - Settings.jsx - страница настроек данных пользователя
        - UserPage.jsx - главная страница пользователя
      - utils
        - Loader.jsx - индикатор загрузки
        - Routes.jsx - маршруты для отображения
        - socket.js - инициализация сокета
    - store
      - mainStore.js - главное хранилище
      - userStore.js - хранилище данных пользователя
      - formStore.js - хранилище данных формы
      - clientStore.js - хранилище данных других пользователей
    - styles
  - ...
- server
  - index.js - главный файл сервера, точка входа
  - middleware
    - auth.middleware.js - промежуточное ПО аутентификации
    - cors.middleware.js - промежуточное ПО для доступа с посторонних доменов
  - models
    - Dialog.js - модель диалога
    - Message.js - модель сообщения
    - User.js - модель пользователя
    - WallPost.js - модель поста
  - routes
    - mainRouter.js
    - messengerRouter.js
    - socketRouter.js
    - userRouter.js
  - controllers
    - mainController.js
    - messengerController.js
    - userController.js
    - socketController.js
  - ...
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
{
  'serverPort': 5000,
  'dbUrl':
    'mongodb+srv://<username>:<password>@cluster0.pscjo.mongodb.net/<dbname>?retryWrites=true&w=majority',
  'secret': 'secret',
};
```
