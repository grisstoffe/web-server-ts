import { Request, Response } from "express";
import { error } from "node:console";
import { todo } from "node:test";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

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

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({
        message: "ID is not a number",
      });

    const todo = await prisma.todo.findMany({
      where: {
        id,
      },
    });
    todo
      ? res.json(todo)
      : res.status(404).json({
          error: `TODO with id ${id} not found`,
        });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    
    if(error) return res.status(400).json({ error });
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body, id
    });

    if(error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo)
      return res.status(404).json({
        error: `Todos with id ${id} not found`,
      });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    return res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id)
      return res.status(404).json({
        message: `Todo with id ${id} not found`,
      });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo)
      return res.status(404).json({
        error: `Todo with id ${id} not found`,
      });
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    deletedTodo
      ? res.json(deletedTodo)
      : res.status(400).json({
          error: `Todo with id ${id} not found`,
        });
  };
}
