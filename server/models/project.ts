import mongoose from 'mongoose';

import { IClient } from './client';

const { Schema } = mongoose;

export interface IProject extends mongoose.Document {
  name: string;
  description: string;
  status: string;
  client: IClient['_id'];
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Done'],
    default: 'Not Started',
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export { Project };
