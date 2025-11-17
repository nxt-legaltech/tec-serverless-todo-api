import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";

import { CreateTodoCommandHandler } from "@/application/internal/command-services/create-todo-command-handler";
import { GetTodosQueryHandler } from "@/application/internal/query-services/get-todos-query-handler";
import { CreateTodoResource } from "@/interfaces/rest/resources/create-todo-resource";
import { GetTodosQuery } from "@/domain/model/queries/get-todos-query";
import { jsonResponse } from "@/interfaces/rest/api-response";
import { TodoResourceFromEntityAssembler } from "./transforms/todo-resource-from-entity-assembler";
import { CreateTodoCommandFromResourceAssembler } from "./transforms/create-todo-command-from-resource-assembler";
import { AppError } from "@/domain/errors/app-error";

export class TodosController {
  constructor(
    private readonly createTodoHandler: CreateTodoCommandHandler,
    private readonly getTodosHandler: GetTodosQueryHandler
  ) {}

  async getTodos(_event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> {
    const query: GetTodosQuery = {};

    const todos = await this.getTodosHandler.handle(query);
    const resources = todos.map((todo) =>
      TodoResourceFromEntityAssembler.toResourceFromEntity(todo)
    );

    return jsonResponse(200, { items: resources });
  }

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

    if (
      typeof resource.title !== "string" ||
      resource.title.trim().length === 0
    ) {
      throw new AppError("Field 'title' must be a non-empty string", 400);
    }

    const command =
      CreateTodoCommandFromResourceAssembler.toCommandFromResource({
        title: resource.title.trim(),
      });

    const todo = await this.createTodoHandler.handle(command);
    const todoResource =
      TodoResourceFromEntityAssembler.toResourceFromEntity(todo);

    return jsonResponse(200, { item: todoResource });
  }
}
