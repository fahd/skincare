import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import {
  ApolloServer,
  AuthenticationError
} from 'apollo-server-express';
import { consoleColor } from '../utils';
import schema from './schema';
import resolvers from './resolvers';
import models from './models';
const isProd = process.env.NODE_ENV === 'production';
const port = isProd ? process.env.PROD_PORT : process.env.DEV_PORT;
const host = isProd ? process.env.PROD_HOST : process.env.DEV_HOST;
const app = express();
app.use(cors());
// app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "800kb" }));
app.use(express.static(path.join(__dirname, '../', 'build')));

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: isProd ? false : true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    return {
      message:'Apollo Error',
      error
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
  cors: {
    origin: `http://${host}:${isProd ? process.env.PROD_PORT : process.env.DEV_PORT}`,
    credentials: true,
  },
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

app.listen(port,"0.0.0.0", () => {
  console.log(
    consoleColor,
    `Connected to Apollo Server on http://${host}:${port}/graphql`,
  );
});
// SSR for production build
if (isProd) {
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html'), err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}
