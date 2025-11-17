import { Todo } from "@/domain/model/entities/todo";
import { TodoRepository } from "@/domain/repositories/todo-repository";
import { dynamodbClient } from "@/infrastructure/config/dynamodb-client";
import { env } from "@/infrastructure/config/env";
import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

/**
 * Dynamodb Todo Repository
 *
 * @summary
 * This DynamodbTodoRepository class implements the TodoRepository interface
 * to provide data access operations for Todo entities using AWS DynamoDB.
 *
 * @description
 * The DynamodbTodoRepository class provides methods to fetch all Todo items,
 * fetch a Todo item by its ID, and save a Todo item to the DynamoDB table.
 *
 * @implements {TodoRepository}
 */
export class DynamodbTodoRepository implements TodoRepository {

  /**
   * @inheritdoc
   */
  async fetchAll(): Promise<Todo[]> {
    const result = await dynamodbClient.send(
      new ScanCommand({
        TableName: env.tableName,
      })
    );

    const items = (result.Items ?? []) as any[];

    return items.map(
      (item) =>
        new Todo({
          id: String(item.id),
          title: String(item.title),
          completed: Boolean(item.completed),
        })
    );
  }

  /**
   * @inheritdoc
   */
  async fetchById(id: string): Promise<Todo | null> {
    const result = await dynamodbClient.send(
      new GetCommand({
        TableName: env.tableName,
        Key: { id },
      })
    );

    const item = result.Item as any;

    if (!item) return null;

    return new Todo({
      id: String(item.id),
      title: String(item.title),
      completed: Boolean(item.completed),
    });
  }

  /**
   * @inheritdoc
   */
  async save(todo: Todo): Promise<void> {
    await dynamodbClient.send(
      new PutCommand({
        TableName: env.tableName,
        Item: {
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        },
      })
    );
  }
}
