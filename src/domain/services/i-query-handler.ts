/**
 * Query Handler Interface
 *
 * @summary
 * This interface defines a contract for handling queries in the application.
 *
 * @description
 * The `IQueryHandler` interface is a generic interface that takes two type parameters:
 * `TQuery` and `TResult`. It declares a single method `handle`, which accepts a query of type `TQuery`
 * and returns a promise that resolves to a result of type `TResult`. This pattern is commonly used
 * in applications following the CQRS (Command Query Responsibility Segregation) architecture.
 *
 * @template TQuery - The type of the query to be handled.
 * @template TResult - The type of the result returned after handling the query.
 */
export interface IQueryHandler<TQuery, TResult> {
  handle(query: TQuery): Promise<TResult>;
}
