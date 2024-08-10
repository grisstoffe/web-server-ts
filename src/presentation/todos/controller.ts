import { Request, Response } from "express";
import { error } from "node:console";
import { todo } from "node:test";

interface TodosInterface {
  id: number;
  text: string;
  completedAt?: Date | null;
}

const todos: TodosInterface[] = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy apple", completedAt: new Date() },
  { id: 3, text: "Buy banana", completedAt: new Date() },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({
        message: "ID is not a number",
      });

    const todo = todos.find((todo) => todo.id === id);
    todo
      ? res.json(todo)
      : res.status(404).json({
          error: `TODO with id ${id} not found`,
        });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const id = todos.length + 1;

    todos.push({ id: id, text: text, completedAt: new Date() });
    const todo = todos.find((todo) => todo.id === id);
    res.json(todo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({
        message: "ID is not a number",
      });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({
        error: `Todos with id ${id} not found`,
      });

    const { text, completedAt } = req.body;
    // if(!text) return res.status(400).json({
    //   error: ' Text property is required'
    // });

    todo.text = text || todo.text;

    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id)
      return res.status(404).json({
        message: `Todo with id ${id} not found`,
      });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({
        error: `Todo with id ${id} not found`,
      });
    todos.splice(todos.indexOf(todo), 1);
    return res.json(todo);
  };
}
