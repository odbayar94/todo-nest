### Import

Create MongoDB container

```bash
docker run -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root -p 8080:27017 --name todo-mongo mongo:latest
```
