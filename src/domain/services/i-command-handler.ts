/**
 * Command Handler Interface
 *
 * @summary
 * This interface defines a contract for handling commands within the application.
 *
 * @description
 * The `ICommandHandler` interface is a generic interface that takes two type parameters:
 * `TCommand` and `TResult`. It declares a single method `handle`, which accepts a command of type `TCommand`
 * and returns a promise that resolves to a result of type `TResult`. This pattern is commonly used
 * in applications following the CQRS (Command Query Responsibility Segregation) architecture.
 *
 * @template TCommand - The type of the command to be handled.
 * @template TResult - The type of the result returned after handling the command.
 */
export interface ICommandHandler<TCommand, TResult> {
  handle(command: TCommand): Promise<TResult>;
}
