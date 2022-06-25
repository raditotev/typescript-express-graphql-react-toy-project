import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
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

const Project = mongoose.model('Project', projectSchema);

export { Project };
