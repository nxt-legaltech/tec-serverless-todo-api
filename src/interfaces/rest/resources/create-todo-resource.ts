/**
 * Create Todo Resource
 *
 * @summary
 * This interface defines the structure for creating a new Todo item.
 *
 * @description
 * The CreateTodoResource interface includes a single property, 'title',
 * which represents the title of the Todo item to be created.
 *
 * @property {string} title - The title of the Todo item.
 */
export interface CreateTodoResource {
  title: string;
}
