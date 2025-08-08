import { IEntity } from '../interfaces/IEntity';
import { IRepository } from '../interfaces/IRepository';

export abstract class BaseService<T extends IEntity> {
  constructor(protected repository: IRepository<T>) {}

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return await this.repository.create(entity);
  }

  async update(id: string, entity: Partial<T>): Promise<T> {
    return await this.repository.update(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}