import { BaseRepository } from "@/shared/infrastructure/persistence/repositories/base-repository";
import { Todo } from "../model/entities/todo";

/**
 * Todo Repository
 *
 * @summary
 * Repository interface for managing Todo entities.
 *
 * @description
 * The TodoRepository interface extends the BaseRepository interface,
 * providing a contract for data access operations specific to Todo entities.
 */
export interface TodoRepository extends Readonly<BaseRepository<Todo>> {
}
