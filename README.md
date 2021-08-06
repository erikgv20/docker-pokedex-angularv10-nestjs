# POKEDEX By EGUERRERO-erikgv20@gmail.com

## Description
Docker Pokedex 
- Backend: NodeJS-NestJS
- Frontend: AngularV10 with proxy "api"->http://localhost:3000/api/

## Run Project

- Command to build:
`docker-compose build`

- Command:  
`docker-compose up`

- Command to remove all images:  
`docker rmi -f $(docker images -a -q)`

- Command to remove all containers:  
`docker rm -vf $(docker ps -a -q)`

### Attach:

- File Json Postman [Pokedex - NestJS.postman_collection.json]