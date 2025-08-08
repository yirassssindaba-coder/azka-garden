import { IEntity } from './IEntity';

export interface IDevEntity extends IEntity {
  developerId: string;
  accessLevel: number;
}