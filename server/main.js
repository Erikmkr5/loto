import express from 'express'

// IMPORTANT! Use full file name with extension to import from local files!
import {ENV_VARIABLES, GLOBALS} from './misc/cnst.js';
import {Script} from './misc/script.js';
import {DbConnection} from './database/connection.js';
import {DrawsRoute} from './routes/drawsRoute.js';
import {TestRoute} from './routes/testRoutes.js';
import {createDrawsCollection} from './models/lottery_draw.js';
import {createUsersCollection} from './models/users.js';

const {HOST, PORT} = ENV_VARIABLES;
const {APP, DB, SERVER} = GLOBALS;

const createApplication = () => {
  return new Script(
    () => console.log('Creating application...'),
    () => {
      global[APP] = express();
      global[APP].use(express.json());
      global[APP].use(express.urlencoded({extended: true}));
    },
    () => console.log('Express application is created\n')
  ).run();
};

const connectToDatabase = async () => {
  return new Script(
    () => console.log('Connecting to Database...'),
    async () => global[DB] = await new DbConnection().connect(),
    () => console.log('Database connection established\n')
  ).run();
};

const refreshCollections = () => {
  return new Script(
    () => console.log('Refreshing Collections...'),
    createUsersCollection,
    createDrawsCollection,
    () => console.log('Collections ready\n')
  ).run();
};

const configureRoutes = () => {
  return new Script(
    () => console.log('Configuring routes...'),
    new TestRoute(),
    new DrawsRoute(),
    () => console.log('Routes configured successfully\n')
  ).run();
};

const runServer = () => {
  return new Script(
    () => console.log('Now running server...'),
    async () => global[SERVER] = await global[APP].listen(PORT),
    () => console.log(`Done!`)
  ).run();
};

new Script(
  createApplication,
  connectToDatabase,
  refreshCollections,
  configureRoutes,
  runServer
).run((_, err) => {
  err
    ? console.log(err)
    : console.log(`\n\n****** Lotto is up and running on //${HOST}:${PORT} ******\n`);
});
