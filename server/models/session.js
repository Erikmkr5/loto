import {Script} from '../misc/script.js';
import mongoose from 'mongoose';
import {DB_COLLECTION, DB_MODEL} from './cnst.js';
import {GLOBALS} from '../misc/cnst.js';

const buildSessionSchema = () => {
  return new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    token: {
      type: String,
      required: true,
      unique: true
    },
    timestamp: {
      type: Number,
      required: true,
    }
  }, {
    collection: DB_COLLECTION.SESSIONS,
    strictQuery: true
  });
};

const initializeModel = (schema) => new mongoose.model(DB_MODEL.SESSION, schema);

export const createSessionsCollection = (db = null) => {
  return new Script(
    buildSessionSchema,
    initializeModel,
    Model => (db || global[GLOBALS.DB]).registerModel(DB_MODEL.SESSION, Model)
  ).run();
};