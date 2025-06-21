# 📦 E-Commerce System – AUVNET Backend Internship Task

This is a simple full-stack E-Commerce application built for the **AUVNET Backend Internship Assessment**.

## 🧑‍💼 Roles

- **Admin**
  - Default credentials:  
    - Username: `admin`  
    - Password: `admin`
  - Can manage:
    - Users
    - Products
    - Categories (3-level depth)
    - Admin accounts

- **User**
  - Can:
    - Sign up, login
    - Add/view/update/delete **own** products
    - Add/delete products from **wishlist**

## 🔧 Tech Stack

| Layer      | Technology                   |
|------------|------------------------------|
| Frontend   | React.js                     |
| Backend    | Spring Boot (Java)           |
| Database   | MySQL                        |
| Auth       | JWT-based Authentication     |
| ORM        | Spring Data JPA (Hibernate)  |
| Docs       | Swagger (`/swagger-ui.html`) |

## 📁 Project Structure

```
ecommerce-system/
├── backend/      <-- Spring Boot Backend
├── frontend/     <-- React Frontend
└── README.md
```

## 🚀 How to Run Locally

### 🖥️ Backend

```bash
cd backend
# Configure DB in application.properties if needed
./mvnw spring-boot:run
# OR
mvn spring-boot:run
```

> Swagger Docs available at: `http://localhost:8080/swagger-ui.html`

### 🌐 Frontend

```bash
cd frontend
npm install
npm start
```

> App runs on: `http://localhost:3000`

## 🗃️ Sample Data

- Admin credentials are **hardcoded** in backend:
  ```
  username: admin
  password: admin
  ```

- To login as Admin:
  - Use the login form
  - Enter `admin` / `admin`

## 📌 Notes

- Pagination is implemented in GET requests.
- Categories support nested structure up to 3 levels.
- UI is kept minimal to focus on backend logic.
- Clear separation of admin/user permissions via role-based auth.

## 🔗 Submission

> GitHub Repo: [https://github.com/seifmohamed0/ecommerce-system](https://github.com/seifmohamed0/ecommerce-system)

> Deployed link (إن وجد): `ضع الرابط هنا`