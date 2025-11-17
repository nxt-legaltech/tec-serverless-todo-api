import { DynamodbTodoRepository } from "@/infrastructure/persistence/repositories/dynamo-todo-repository";
import { CreateTodoCommandHandler } from "@/application/internal/command-services/create-todo-command-handler";
import { GetTodosQueryHandler } from "@/application/internal/query-services/get-todos-query-handler";
import { TodosController } from "@/interfaces/rest/todos-controller";

/**
 * Composition Root
 *
 * @summary
 * Central place for dependency injection and object composition.
 *
 * @description
 * This module is responsible for wiring up all dependencies and creating
 * fully configured instances. It sits outside of any specific layer and
 * is the only place where infrastructure implementations are instantiated
 * and injected into the application.
 *
 * This follows the Dependency Inversion Principle and keeps the rest
 * of the application decoupled from infrastructure details.
 *
 * @remarks
 * Located at the root of src/ to avoid coupling between layers.
 * Infrastructure and interfaces layers should not depend on each other.
 */

/**
 * Creates and configures the TodosController with all its dependencies.
 *
 * @returns A fully configured TodosController instance.
 */
export function createTodosController(): TodosController {
  const todoRepository = new DynamodbTodoRepository();

  const createTodoHandler = new CreateTodoCommandHandler(todoRepository);
  const getTodosHandler = new GetTodosQueryHandler(todoRepository);

  return new TodosController(createTodoHandler, getTodosHandler);
}
