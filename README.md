# EVENT DRIVEN MICROSERVICES

## BUILT WITH 🔨

- Typescript
- Docker
- Docker Compose
- Kafka

## GETTING STARTED 🚀

Run application:

```bash
 docker-compose up --build
```

Shutdown application:

```bash
docker-compose down
```

## USAGE 📖

> 3 default services are running on ports 3001, 3002, 3003

### Create message

POST /api/resource
Payload: {message: “somthing”}
Response: {id: “XX”};

```bash
localhost:3001/api/resource
```

### Get message

GET /api/resource/{:id}

Response: {id:”XX”, message: “somthing”,
parsed:”SOME_PARSING”,
serviceId:”SERVICE_ID”}

### ADD ANOTHER MICROSERVICE

- add service by copy patse service1 from the docker-compose.yml file. choose one of 3 parsers (PARSER_A, PARSER_B, PARSER_C).
  Don't forget to change the SERVICE_ID and port.
