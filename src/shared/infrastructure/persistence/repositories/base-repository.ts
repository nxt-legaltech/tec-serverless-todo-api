/**
 * Base Repository
 *
 * @summary
 * Generic abstract class for data repositories.
 *
 * @description
 * This abstract class defines the basic CRUD operations that any data repository should implement.
 * It provides a contract for fetching all records, fetching a record by ID, and saving a record.
 * 
 * @method fetchAll - Fetch all records of type T.
 * @method fetchById - Fetch a record by its ID.
 * @method save - Save a new record of type T.
 *
 * @template T - The type of the entity that the repository will manage.
 */
export abstract class BaseRepository<T> {
  /**
   * Fetch all records of type T.
   *
   * @returns A promise that resolves to an array of records of type T.
   */
  abstract fetchAll(): Promise<T[]>;
  /**
   * Fetch a record by its ID.
   * @param id - The ID of the record to fetch.
   * @returns A promise that resolves to the record of type T or null if not found.
   */
  abstract fetchById(id: string): Promise<T | null>;
  /**
   * Save a new record of type T.
   * @param item  - The record to save.
   * @returns A promise that resolves when the record is saved.
   */
  abstract save(item: T): Promise<void>;

  /**
   * You can uncomment the methods below when you need to implement delete and update functionalities.
   */

  /* 
    abstract delete(id: string): Promise<void>;
    abstract update(id: string, item: Partial<T>): Promise<void>; 
    */
}
