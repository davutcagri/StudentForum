# StudentForum

StudentForum is a full-stack forum application I built for university students to share posts, comment on discussions and find other students.

The backend is written with Java and Spring Boot, and the frontend uses React.

The project includes JWT authentication, user profiles, posts and comments, pagination, input validation and Elasticsearch-based user search. I also used Swagger/OpenAPI for testing and documenting the REST API.

## Technologies

**Backend:** Java 17, Spring Boot, Spring Security, Spring Data JPA, Elasticsearch, JWT

**Frontend:** React, Vite, Zustand, Axios, Tailwind CSS

**Other:** Docker Compose, Swagger/OpenAPI, H2

## Running

Start Elasticsearch:

```bash
docker compose up -d
```

Start the backend:

```bash
cd backend
./mvnw spring-boot:run
```

Then start the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:8080`.

## Notes

I built this project mainly to improve my experience with Spring Boot and full-stack application development.

Some of the areas I focused on were authentication with Spring Security, separating the application into controller/service/repository layers, API validation and integrating Elasticsearch with the main application.
