/**
 * Todo Resource
 *
 * @summary
 * This interface represents a Todo item in the REST API.
 *
 * @description
 * The TodoResource interface includes properties for the unique identifier,
 * title, and completion status of a Todo item.
 *
 * @property {string} id - The unique identifier of the Todo item.
 * @property {string} title - The title of the Todo item.
 * @property {boolean} completed - The completion status of the Todo item.
 */
export interface TodoResource {
  id: string;
  title: string;
  completed: boolean;
}
