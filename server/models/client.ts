import mongoose from 'mongoose';

const { Schema } = mongoose;

const clientSchema = new Schema({
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

const Client = mongoose.model('Client', clientSchema);

export { Client };
