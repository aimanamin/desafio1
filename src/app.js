const express = require("express");
const { v4:uuid } = require("uuid");
const cors = require("cors");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;
  const repo = {
    "id": uuid(),
    title,
    url,
    techs,
    "likes": 0
  }
  repositories.push(repo);
  return response.send(repo);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const {title, url, techs} = request.body;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if (repoIndex < 0) {
    return response.status(400).send({"error": "not found"});
  }
  repositories[repoIndex]= {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  };

  return response.send(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id == id);
  if (repoIndex < 0) {
    return response.status(400).send({"error": "not found"});
  }
  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repo = repositories.find(repo => repo.id === id);
  if (!repo) 
    return response.status(400).send({"error": "repo not found"});
  repo.likes += 1;
  return response.send({"likes": repo.likes});
});

module.exports = app;
