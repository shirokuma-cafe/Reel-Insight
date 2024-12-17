# Reel Insight

## Movie List Web Application - Build Project
* Established a full stack web app in React using REST APIs from a large Movie database to allow users to explore movies
* Consolidated React components for UI, in JSX syntax, component lifecycle methods, and reusable component design
* Engineered a backend server with Node and Express to handle API requests using Axios, perform server-side validation, and interact with the database

## Run Project with Docker
### Prerequisites
  - Docker Desktop installed
  - MySQL on your local machine

### Set up MySQL Database
1. Connect to a MySQL server and create a new database
```sh
CREATE DATABASE movies;  
```
2. Select this as your current database
```sh
USE movies;
```
3. Create a table for your favorite movies with the following:
```sh
CREATE TABLE FavoriteMovies (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  releaseDate DATE NOT NULL,
  shortDescription TEXT
);
```

### Clone repo and move to project directory
1. In your terminal, clone the remote repository
```sh
git clone https://github.com/shirokuma-cafe/Reel-Insight.git
```
2. Move into the project directory
```sh
cd Reel-Insight
```

### Build and Run Docker Image
1. Build the Docker Image
```sh
docker build -t my-movie-app .
```
2. Run the Docker Image (specify your own MySQL password)
```sh
docker run -p 3000:3000 -p 5173:5173 \
  -e MYSQL_HOST=host.docker.internal \
  -e DB_PASSWORD=your_mysql_password \
  my-movie-app
```
3. Go to http://localhost:5173/ to check out the app

## Screenshots
![Home Page](/Screenshots/home.png)

![Search Page](/Screenshots/search.png)

![Movie Detail Page](/Screenshots/detail.png)