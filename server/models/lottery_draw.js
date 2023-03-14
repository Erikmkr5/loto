import {Script} from '../misc/script.js';
import mongoose from 'mongoose';
import {DB_COLLECTION, DB_MODEL} from './cnst.js';
import {GLOBALS} from '../misc/cnst.js';

const buildDrawsSchema = () => {
  return new mongoose.Schema({
    date: {
      type: Number,
      required: true,
      unique: true
    },
    draw: {
      type: String,
      required: true,
      unique: false
    },
    winnerList: {
      type: [],
      required: true,
      unique: false
    }

  }, {
    collection: DB_COLLECTION.DRAWS,
    strictQuery: true
  });
};

const initializeModel = (schema) => {
  return new mongoose.model(DB_MODEL.DRAW, schema);
};

export const createDrawsCollection = (dbConnection = null) => {
  return new Script(
    buildDrawsSchema,
    initializeModel,
    Model => (dbConnection || global[GLOBALS.DB]).registerModel(DB_MODEL.DRAW, Model)
  ).run();
};
