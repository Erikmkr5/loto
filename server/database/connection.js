import mongoose from 'mongoose';
import {ENV_VARIABLES} from '../misc/cnst.js';
import {DB_SEARCH_MODE, IS_CONNECTED} from './cnst.js';
import {asPromise} from '../misc/utils.js';
import {Script} from '../misc/script.js';
import {createDrawsCollection} from '../models/lottery_draw.js';
import {createUsersCollection} from '../models/users.js';

const {DB_HOST, DB_PORT, DB_NAME} = ENV_VARIABLES;
const {FIND_MANY, FIND_ONE} = DB_SEARCH_MODE;

export class DbConnection {

  _connectionPath = '';

  _models = {};

  connect = () => {
    return this.isConnected
      ? asPromise(this)
      : new Script(
        mongoose.set('strictQuery', false),
        mongoose.connect(this._connectionPath),
        () => this
      ).run();
  };

  disconnect = () => {
    return mongoose.disconnect()
  };

  create = (modelName, data) => {
    return new Script(
      () => this.getModel(modelName),
      Model => {
        console.log(Model);
        return new Model(data).save()
      },
    ).run();
  };

  read = (modelName, filter, getMany = false) => {
    return new Script(
      () => this.getModel(modelName),
      Model => Model[getMany ? FIND_MANY : FIND_ONE](filter)
    ).run();
  };

  update = () => {};

  delete = () => {};

  registerModel = (modelName, modelEntity) => {
    this._models[modelName] = modelEntity;
    return this;
  };

  getModel = (modelName) => {
    return this._models[modelName];
  };

  get isConnected() {
    return mongoose.connection.readyState === IS_CONNECTED;
  }

  get connection() {
    return mongoose.connection;
  }

  constructor(host = DB_HOST, port = DB_PORT, name = DB_NAME) {
    this._connectionPath = `mongodb://${host}:${port}/${name}?directConnection=true`;
  }
}