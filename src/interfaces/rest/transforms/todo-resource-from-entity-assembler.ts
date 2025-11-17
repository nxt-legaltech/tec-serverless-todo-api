import { Todo } from "@/domain/model/entities/todo";
import { TodoResource } from "../resources/todo-resource";

/**
 * Assembler to convert Todo entity to TodoResource
 *
 * @summary
 * This class provides a static method to transform a Todo entity
 * into a TodoResource, facilitating the conversion between
 * domain entities and API resource representations.
 *
 * @description
 * The TodoResourceFromEntityAssembler class contains a single static method,
 * toResourceFromEntity, which takes a Todo entity as input and returns
 * a TodoResource. This is useful in scenarios where domain entities need to be
 * presented in a format suitable for API responses.
 */
export class TodoResourceFromEntityAssembler {
  static toResourceFromEntity(entity: Todo): TodoResource {
    return {
      id: entity.id,
      title: entity.title,
      completed: entity.completed,
    };
  }
}
