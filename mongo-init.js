print('Start #################################################################');

//Connexion à admin
db = db.getSiblingDB('admin');
db.auth('root', 'example');
db.createUser(
  {
    user: "myUserAdmin",
    pwd: "myPassword",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
);

//Création / Connexion Painting
db = db.getSiblingDB('MEAN');
db.createUser(
  {
    user: "user",
    pwd: "user",
    customData: {  },
    roles: [{ role: "readWrite", db: "MEAN" }]
  }
)

print('END #################################################################');