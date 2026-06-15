import express from "express";
import { addPerson, deletePerson, getAllPerson, getPersonById, updatePerson } from "../controllers/Person.Controller";
const PersonRouter = express.Router();

PersonRouter.post('/add', addPerson)
PersonRouter.put('/:id',updatePerson)
PersonRouter.delete("/:id", deletePerson);
PersonRouter.get('/:id',getPersonById)
PersonRouter.get('/',getAllPerson)


export default PersonRouter