import mongoose from 'mongoose';
import {DB_COLLECTION, DB_MODEL} from './cnst.js';
import {GLOBALS} from '../misc/cnst.js';
import {Script} from '../misc/script.js';

const buildUsersSchema = () => {
  return new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: false
    },
    surname: {
      type: String,
      required: true,
      unique: false
    },
    age: {
      type: Number,
      required: true,
      unique: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }, {
    collection: DB_COLLECTION.USERS,
    strictQuery: true
  });
}

const initializeModel = (schema) => {
  return new mongoose.model(DB_MODEL.USER, schema);
};

export const createUsersCollection = (dbConnection = null) => {
  return new Script(
    buildUsersSchema,
    initializeModel,
    Model => (dbConnection || global[GLOBALS.DB]).registerModel(DB_MODEL.USER, Model)
  ).run();
};
