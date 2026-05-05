#  User Service API

Простой REST API для управления пользователями, созданный с использованием **Node.js, Express, TypeScript, Prisma, and PostgreSQL**.

---

##  Особенности

- Регистрация пользователя
- Логин пользователя (аутентификация JWT)
- Доступ на основе ролей (ADMIN / USER)
- Получение пользователя по идентификатору (self или admin)
- Получение всех пользователей (только для администратора)
- Блокировка пользователя (self или admin)
- Хэширование паролей (bcrypt)

---

##  Технический стек

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Jest (testing)

---

##  Структура проекта
- src/
  - controllers/
  - services/
  - repositories/
  - routes/
  - middlewares/
- app.ts
- server.ts
- prisma/
= tests/

---
##  Установка

### 1. Репозиторий клонирования

```bash
git clone <repo-url>
cd user-service
npm install

Create .env file: 
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_secret_key"
PORT=3000

```bash
npx prisma migrate dev --name init
npx prisma generate

---
### 2.Репозиторий клонирования

```bash
npm run dev  

#
---
##  API Endpoints

- User registration : POST /users/register
- User login : POST /users/login
- Get user by ID: GET /users/:id
- Get all users (ADMIN only): GET /users
- Block user: PATCH /users/:id/block

---
##  Выполнение тестов

```bash
npm install
npm test
