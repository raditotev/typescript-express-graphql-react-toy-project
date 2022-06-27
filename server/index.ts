import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import colors from 'colors';

import { schema } from './schema/schema.js';
import { connectDB } from './config/db.js';

const app = express();
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
