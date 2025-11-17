import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";

import { CreateTodoCommandHandler } from "@/application/internal/command-services/create-todo-command-handler";
import { GetTodosQueryHandler } from "@/application/internal/query-services/get-todos-query-handler";
import { CreateTodoResource } from "@/interfaces/rest/resources/create-todo-resource";
import { GetTodosQuery } from "@/domain/model/queries/get-todos-query";
import { responseHelper } from "@/shared/helpers/response-helper";
import { TodoResourceFromEntityAssembler } from "./transforms/todo-resource-from-entity-assembler";
import { CreateTodoCommandFromResourceAssembler } from "./transforms/create-todo-command-from-resource-assembler";
import { AppError } from "@/domain/errors/app-error";

/**
 * Todos Controller
 *
 * @summary
 * This controller handles HTTP requests related to Todo items, including
 * retrieving the list of Todos and creating new Todo items.
 *
 * @description
 * The TodosController class provides methods to handle incoming API Gateway
 * requests for managing Todo items. It uses command and query handlers to
 * process the business logic and returns appropriate HTTP responses.
 */
export class TodosController {
  constructor(
    private readonly createTodoHandler: CreateTodoCommandHandler,
    private readonly getTodosHandler: GetTodosQueryHandler
  ) {}

  /**
   * Get Todos
   * @param _event The API Gateway event
   * @returns A promise that resolves to an API Gateway proxy result containing the list of Todos.
   */
  async getTodos(
    _event: APIGatewayProxyEventV2
  ): Promise<APIGatewayProxyResult> {
    const query: GetTodosQuery = {};

    const todos = await this.getTodosHandler.handle(query);
    const resources = todos.map((todo) =>
      TodoResourceFromEntityAssembler.toResourceFromEntity(todo)
    );

    return responseHelper(200, { items: resources });
  }

  /**
   * Create Todo
   * @param event The API Gateway event
   * @returns A promise that resolves to an API Gateway proxy result containing the newly created Todo item.
   */
  async createTodo(
    event: APIGatewayProxyEventV2
  ): Promise<APIGatewayProxyResult> {
    if (!event.body) {
      throw new AppError("Request body is required", 400);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(event.body);
    } catch {
      throw new AppError("Invalid JSON body", 400);
    }

    const resource = payload as Partial<CreateTodoResource>;

    const command =
      CreateTodoCommandFromResourceAssembler.toCommandFromResource({
        title: resource.title ?? "",
      });

    const todo = await this.createTodoHandler.handle(command);

    const todoResource =
      TodoResourceFromEntityAssembler.toResourceFromEntity(todo);

    return responseHelper(200, { item: todoResource });
  }
}
