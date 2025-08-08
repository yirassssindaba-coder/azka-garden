import { IEntity } from '../interfaces/IEntity';

export abstract class BaseEntity implements IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}