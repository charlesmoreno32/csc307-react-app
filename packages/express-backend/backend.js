import express from "express";
import cors from "cors";
import {
    addUser,
    deleteUser,
    getUsers,
    findUserById,
    deleteUserById,
    findUserByName,
    findUserByJob,
    findUserByNameAndJob
  } from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if(name && job){
        findUserByNameAndJob(name, job).then((user) => res.send(user)).catch((error) => { console.log(error); });
    }
    else if(name && !job){
        findUserByName(name).then((user) => res.send(user)).catch((error) => { console.log(error); });
    }
    else if(!name && job){
        findUserByJob(job).then((user) => res.send(user)).catch((error) => { console.log(error); });
    }
    else{
        getUsers().then((users) => res.send({users_list: users})).catch((error) => { console.log(error); });
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd).then((user) => res.status(201).send(user)).catch((error) => { console.log(error); });
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    findUserById(id).then((user) => {
        if(!user) {
            res.status(404).send('Resource not found.')
        } else {
            res.send(user);
        }
    }).catch((error) => { console.log(error); });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    deleteUserById(id).then((user) => {
        if(!user) {
            res.status(404).send('Resource not found.');
        } else {
            res.status(204).send('User successfully removed.');
        }
    }).catch((error) => { console.log(error); });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});