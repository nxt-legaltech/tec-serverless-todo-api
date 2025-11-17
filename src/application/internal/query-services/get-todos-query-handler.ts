import { Todo } from "@/domain/model/entities/todo";
import { GetTodosQuery } from "@/domain/model/queries/get-todos-query";
import { TodoRepository } from "@/domain/repositories/todo-repository";
import { IQueryHandler } from "@/domain/services/i-query-handler";

/**
 * Get Todos Query Handler
 *
 * @summary
 * Handles the retrieval of all Todo items by implementing the IQueryHandler interface.
 *
 * @description
 * This class is responsible for processing the GetTodosQuery and returning a list of Todo entities. It
 * interacts with the TodoRepository to fetch the data.
 *
 * @implements {IQueryHandler<GetTodosQuery, Todo[]>}
 */
export class GetTodosQueryHandler
  implements IQueryHandler<GetTodosQuery, Todo[]>
{
  constructor(private readonly todoRepository: TodoRepository) {}

  /**
   * Handle GetTodosQuery
   * @param query - The query to retrieve all Todo items.
   * @returns A promise that resolves to an array of Todo items.
   */
  async handle(query: GetTodosQuery): Promise<Todo[]> {
    return await this.todoRepository.fetchAll();
  }
}
