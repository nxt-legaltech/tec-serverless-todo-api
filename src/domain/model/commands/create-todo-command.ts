/**
 * Create Todo Command
 *
 * @summary Command to create a new Todo item with a specified title.
 *
 * @description
 * This interface defines the structure of the command used to create a new Todo item. It includes a
 * single property, `title`, which represents the title of the Todo item to be created.
 *
 * @property {string} title - The title of the Todo item to be created.
 */
export interface CreateTodoCommand {
  title: string;
}
