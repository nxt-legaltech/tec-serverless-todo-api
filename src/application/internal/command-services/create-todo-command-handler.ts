import { randomUUID } from "crypto";
import { CreateTodoCommand } from "@/domain/model/commands/create-todo-command";
import { Todo } from "@/domain/model/entities/todo";
import { ICommandHandler } from "@/domain/services/i-command-handler";
import { TodoRepository } from "@/domain/repositories/todo-repository";
import { AppError } from "@/domain/errors/app-error";

/**
 * Create Todo Command Handler
 *
 * @summary
 * This class handles the creation of a new Todo item. It implements the
 * ICommandHandler interface for the CreateTodoCommand.
 *
 * @description
 * The CreateTodoCommandHandler class is responsible for processing the
 * CreateTodoCommand. It generates a unique identifier for the new Todo item,
 * initializes it with the provided title and a default completed status of false,
 * and saves it to the TodoRepository.
 *
 * @implements {ICommandHandler<CreateTodoCommand, Todo>}
 */
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand, Todo>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  /**
   * Handle CreateTodoCommand
   * @param command - The command containing the title for the new Todo item.
   * @returns The newly created Todo item.
   */
  async handle(command: CreateTodoCommand): Promise<Todo> {
    if (
      typeof command.title !== "string" ||
      command.title.trim().length === 0
    ) {
      throw new AppError("Field 'title' must be a non-empty string", 400);
    }

    const todo = new Todo({
      id: randomUUID(),
      title: command.title.trim(),
      completed: false,
    });

    await this.todoRepository.save(todo);

    return todo;
  }
}
