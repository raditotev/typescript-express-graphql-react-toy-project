import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IClient extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
}

const clientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model<IClient>('Client', clientSchema);

export { Client };
