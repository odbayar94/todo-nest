import express from "express";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb://root:root@192.168.19.18:8080?authSource=admin"
);
const database = client.db("todos");

const app = express();
const port = 3000;
app.use(express.json());
app.get("/todos", async (req, res) => {
  const connection = await client.connect();
  const { title } = req.query;

  let query = {};
  if (title) {
    query = { title };
  }

  const todos = await database.collection("todos").find(query).toArray();

  connection.close();

  res.send(todos);
});

app.post("/todos", async (req, res) => {
  const connection = await client.connect();
  const todo = req.body;
  console.log(todo);

  await database.collection("todos").insertOne(todo);

  connection.close();
  res.status(201).send({ success: true });
});

app.delete("/todos/:id", async (req, res) => {
  const connection = await client.connect();

  const { id } = req.params;
  await database.collection("todos").deleteOne({ _id: id });

  connection.close();
  res.status(204).send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
