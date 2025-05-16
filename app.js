const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // pour générer un id unique

const app = express();
const PORT = 3000;

const todosFilePath = path.join(__dirname, "data", "todos.json");

app.use(express.json());

// Lecture de toutes les tâches
app.get("/", (req, res) => {
  fs.readFile(todosFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Erreur lecture fichier" });
    try {
      const todos = JSON.parse(data);
      res.json(todos);
    } catch {
      res.status(500).json({ message: "Erreur parsing JSON" });
    }
  });
});

// Ajouter une tâche
app.post("/", (req, res) => {
  const newTodo = { id: uuidv4(), ...req.body };

  fs.readFile(todosFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Erreur lecture fichier" });

    const todos = JSON.parse(data || "[]");
    todos.push(newTodo);

    fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
      if (err)
        return res.status(500).json({ message: "Erreur écriture fichier" });
      res.status(201).json(newTodo);
    });
  });
});

// Modifier une tâche
app.put("/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(todosFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Erreur lecture fichier" });

    let todos = JSON.parse(data || "[]");
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1)
      return res.status(404).json({ message: "Tâche non trouvée" });

    todos[index] = { ...todos[index], ...req.body };

    fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2), (err) => {
      if (err)
        return res.status(500).json({ message: "Erreur écriture fichier" });
      res.json(todos[index]);
    });
  });
});

// Supprimer une tâche
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(todosFilePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Erreur lecture fichier" });

    let todos = JSON.parse(data || "[]");
    const newTodos = todos.filter((todo) => todo.id !== id);

    if (todos.length === newTodos.length)
      return res.status(404).json({ message: "Tâche non trouvée" });

    fs.writeFile(todosFilePath, JSON.stringify(newTodos, null, 2), (err) => {
      if (err)
        return res.status(500).json({ message: "Erreur écriture fichier" });
      res.json({ message: "Tâche supprimée" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
