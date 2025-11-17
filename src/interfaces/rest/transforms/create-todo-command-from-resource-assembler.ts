import { CreateTodoCommand } from "@/domain/model/commands/create-todo-command";
import { CreateTodoResource } from "../resources/create-todo-resource";

/**
 * Assembler to convert CreateTodoResource to CreateTodoCommand
 *
 * @summary
 * This class provides a static method to transform a CreateTodoResource
 * into a CreateTodoCommand, facilitating the conversion between
 * API resource representations and domain command objects.
 *
 * @description
 * The CreateTodoCommandFromResourceAssembler class contains a single static method,
 * toCommandFromResource, which takes a CreateTodoResource as input and returns
 * a CreateTodoCommand. This is useful in scenarios where data received from
 * an API needs to be converted into a format suitable for domain logic processing.
 */
export class CreateTodoCommandFromResourceAssembler {
  /**
   * Converts a CreateTodoResource to a CreateTodoCommand
   * @param resource - The CreateTodoResource to be converted
   * @returns A CreateTodoCommand representing the input resource
   */
  static toCommandFromResource(
    resource: CreateTodoResource
  ): CreateTodoCommand {
    return {
      title: resource.title,
    };
  }
}
