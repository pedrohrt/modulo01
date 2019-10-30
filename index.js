const express = require("express"); 

const server = express(); 

server.use(express.json());

//Query params = ?id=1 
//Route params = /users/1
//Request body = {"name": "diego"}

// GRUD = Create, Read, Upadte, Remove


const users = ['Diego', 'Paulo', 'Lucas'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd('Request');

});

function CkeckUser(req, res, next) {
  if (!req.body.name){
    return res.status(400).json({error: 'User name is required'});

  }

  return next();
}

function CheckExistis(req, res, next){
  const user = users[req.params.index];
  if (!user){
    return res.status(400).json({error: 'User index not found'});
  }

  req.user = user

  return next();
}

server.get('/users', CheckExistis, (req, res) => {
  return res.json(req.user);
})

server.get('/users/:index', CheckExistis, (req, res) => {
  const {index} = req.params;

  return res.json(users[index]);
})

server.post('/users', CkeckUser, (req, res) => {
  const {name} = req.body;
  users.push(name);
  
  return res.json(users);
});

server.put('/users/:index', CkeckUser,CheckExistis,  (req, res) => {
  const {index} = req.params;
  const {name} = req.body;
  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', (req, res) =>{
  const {index} = req.params;
  users.splice(index, 1);
  return res.send();
})

server.listen(3000); // chamar o servidor do express


