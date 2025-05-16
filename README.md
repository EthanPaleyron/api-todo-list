# 📝 API Todo List

Une API simple en Node.js/Express pour gérer une liste de tâches (todos) en CRUD, avec persistance des données dans un fichier JSON.

## 🚀 Prérequis

- [Docker](https://www.docker.com/) installé sur votre machine

## 📁 Structure du projet

```
api-todo-list/
├── data/
│   └── todos.json     # Fichier JSON pour stocker les tâches
├── app.js            # Serveur Express
├── Dockerfile        # Fichier Docker
└── package.json      # Dépendances et scripts
```

## ⚙️ Installation & Lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/api-todo-list.git
cd api-todo-list
```

### 2. Construire l'image Docker

```bash
docker build -t todo-app .
```

### 3. Supprimer l'ancien conteneur s'il existe (optionnel)

```bash
docker rm -f my-todo-container
```

### 4. Lancer le conteneur

```bash
docker run -p 3000:3000 --name my-todo-container todo-app
```

L'API est maintenant disponible sur http://localhost:3000

## 🛠 Endpoints disponibles

- `GET /` → Liste toutes les tâches

(Le CRUD complet peut être ajouté si besoin)

## 📌 Notes

Les données sont stockées dans `data/todos.json` à l'intérieur du conteneur.

Pour persister les données entre les relances du conteneur, vous pouvez ajouter un volume Docker :

```bash
docker run -p 3000:3000 -v $(pwd)/data:/app/data --name my-todo-container todo-app
```
