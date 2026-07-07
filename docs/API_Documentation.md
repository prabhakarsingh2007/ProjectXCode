# REST API Specifications

This document outlines the API route layout, authentication headers, request bodies, and standard JSON response shapes.

## Authentication Header
Protected endpoints expect a JSON Web Token (JWT) passed in the `Authorization` request header:
```http
Authorization: Bearer <your_jwt_access_token>
```

---

## 1. Authentication & Profiles (`/api/accounts/`)

### Register User
* **URL**: `/api/accounts/register/`
* **Method**: `POST`
* **Auth Required**: No
* **Request Body**:
```json
{
  "username": "client_jane",
  "email": "jane@company.com",
  "password": "Password123",
  "first_name": "Jane",
  "last_name": "Doe",
  "phone": "555-0199",
  "company": "Doe Enterprises",
  "role": "client"
}
```
* **Response (201 Created)**:
```json
{
  "user": {
    "id": 2,
    "username": "client_jane",
    "email": "jane@company.com",
    "first_name": "Jane",
    "last_name": "Doe",
    "role": "client",
    "phone": "555-0199",
    "company": "Doe Enterprises"
  },
  "refresh": "eyJ0eXAi...",
  "access": "eyJ0eXAi..."
}
```

### Log In
* **URL**: `/api/accounts/login/`
* **Method**: `POST`
* **Auth Required**: No
* **Request Body**:
```json
{
  "username": "client_jane",
  "password": "Password123"
}
```
* **Response (200 OK)**:
```json
{
  "user": {
    "id": 2,
    "username": "client_jane",
    "email": "jane@company.com",
    "first_name": "Jane",
    "last_name": "Doe",
    "role": "client",
    "phone": "555-0199",
    "company": "Doe Enterprises"
  },
  "refresh": "eyJ0eXAi...",
  "access": "eyJ0eXAi..."
}
```

### Fetch / Update Profile
* **URL**: `/api/accounts/profile/`
* **Method**: `GET` / `PUT`
* **Auth Required**: Yes
* **Response (200 OK)**:
```json
{
  "id": 2,
  "username": "client_jane",
  "email": "jane@company.com",
  "first_name": "Jane",
  "last_name": "Doe",
  "role": "client",
  "phone": "555-0199",
  "company": "Doe Enterprises"
}
```

---

## 2. Project Pipelines (`/api/projects/`)

### Fetch Project Requests
* **URL**: `/api/projects/`
* **Method**: `GET`
* **Auth Required**: Yes
* **Behavior**: If authenticated as a client, returns only that user's projects. If staff/admin, returns all records.
* **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "client": 2,
    "client_name": "client_jane",
    "service": 1,
    "service_detail": {
      "id": 1,
      "title": "Premium Web Development",
      "description": "End-to-end full-stack web applications...",
      "icon": "Code",
      "price": "2500.00",
      "billing_cycle": "one_time"
    },
    "title": "Nexus FinTech App",
    "description": "Building a custom portfolio tracker.",
    "budget": "2500.00",
    "status": "pending",
    "payment_status": "unpaid",
    "created_at": "2026-07-06T18:04:37.458Z"
  }
]
```

### Submit Project Request
* **URL**: `/api/projects/`
* **Method**: `POST`
* **Auth Required**: Yes
* **Request Body**:
```json
{
  "title": "Nexus FinTech App",
  "description": "Building a custom portfolio tracker.",
  "budget": 2500.00,
  "service": 1
}
```
* **Response (210 Created)**: Returns the serialized ProjectRequest.

---

## 3. Analytical Dashboard (`/api/dashboard/`)

### Get Dashboard Stats
* **URL**: `/api/dashboard/`
* **Method**: `GET`
* **Auth Required**: Yes
* **Behavior**: Returns analytics and recent activity lists adjusted for user roles.
* **Response (200 OK - Client)**:
```json
{
  "role": "client",
  "stats": {
    "activeProjects": 1,
    "pendingProjects": 0,
    "completedProjects": 0,
    "totalPaid": 2500.00
  },
  "recentProjects": [...],
  "recentNotifications": [...]
}
```
