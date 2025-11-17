/**
 * Props required to create a Todo entity.
 */
export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}

/**
 * Represents a Todo entity in the domain model.
 *
 * @summary
 * A Todo entity has an id, title, and completed status.
 *
 * @description
 * The Todo class encapsulates the properties and behaviors of a todo item.
 * It includes an identifier, a title, and a boolean indicating whether the todo is completed.
 *
 * @property {string} id - The unique identifier for the todo item.
 * @property {string} title - The title or description of the todo item.
 * @property {boolean} completed - Indicates whether the todo item is completed.
 */
export class Todo {
  public readonly id: string;
  public title: string;
  public completed: boolean;

  /**
   * Creates a new Todo entity.
   * @param {TodoProps} props - The properties required to create a Todo.
   */
  constructor(props: TodoProps) {
    this.id = props.id;
    this.title = props.title;
    this.completed = props.completed;
  }
}
