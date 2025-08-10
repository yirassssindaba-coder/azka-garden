import { IRepository } from '../interfaces/IRepository';
import { IEntity } from '../interfaces/IEntity';

export abstract class BaseRepository<T extends IEntity> implements IRepository<T> {
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  abstract update(id: string, entity: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;

  protected generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  protected setTimestamps<K extends Partial<T>>(entity: K): K & { createdAt: Date; updatedAt: Date } {
    const now = new Date();
    return {
      ...entity,
      createdAt: now,
      updatedAt: now
    };
  }

  protected updateTimestamp<K extends Partial<T>>(entity: K): K & { updatedAt: Date } {
    return {
      ...entity,
      updatedAt: new Date()
    };
  }
}