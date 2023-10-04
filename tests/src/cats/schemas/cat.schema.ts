import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  breed: { type: String },
});
