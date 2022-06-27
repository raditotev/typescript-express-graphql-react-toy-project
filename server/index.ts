import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';

import { schema } from './schema/schema';
import { connectDB } from './config/db';

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB();
