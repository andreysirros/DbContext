import { Schema } from 'mongoose';

export interface IModelDefinition {
  name: string;
  schema: Schema;
  collection?: string;
}
