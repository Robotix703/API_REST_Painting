# Opérations sur la BDD

docker exec -it <mongoContainer> mongo

Voir sur internet pour plus d'informations

## Connexion à la BDD
db.auth("root", "<MDP>")

## Création d'un utilisateur Superutilisateur
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: "myPassword",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

## Création d'un utilisateur pour MEAN
use MEAN
db.createUser(
  {
    user: "user",
    pwd: "user",
    customData: {  },
    roles: [{ role: "readWrite", db: "MEAN" }]
  }
)