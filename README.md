# StudentForum
StudentForum is a simple forum application where students can create posts and interact
The project is actively under development, and new features are being added continuously
## Features
- User registration and authentication
- Create and list forum posts
- Comment system
- Separated backend and frontend architecture
  
## Technologies
**Backend**
- Java
- Spring Boot
  
**Frontend**
- JavaScript
- React
  
**Database**
- Docker
- PostgreSQL

  
## Requirements
- Java 17+
- Node.js 16+
- PostgreSQL
- Docker
- Git
  
## Installation
### 1) Clone the repository
```bash
git clone https://github.com/davutcagri/StudentForum.git
```
### 2) Backend setup
```bash
cd StudentForum/backend
./mvnw clean install
```
### 3) Frontend setup
```bash
cd StudentForum/frontend
npm install
```
## Running the application

### 1) Run backend
```bash
./mvnw spring-boot:run
```
### 2) Run Docker
```bash
docker compose up -d
```
### 3) Run frontend
```bash
npm run dev
```
Frontend is usually available at:
```bash
http://localhost:3000
```
