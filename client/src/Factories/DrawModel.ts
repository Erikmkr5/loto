import { IDrawModel } from '../Shared/types';
import { action, observable } from 'mobx';

export const DrawModelsFactory = (): IDrawModel => {
  const model: IDrawModel = observable({
    _uid: null,
    _values: new Set<number>(),
    _coincidences: new Set<number>()
  });

  Object.defineProperties(model, {
    uid: {
      get: () => model._uid,
      set: action(uid => model._uid = uid)
    },
    values: {
      get: () => Array.from(model._values.values()),
      set: action(values => model._values = new Set<number>(values))
    },
    coincidences: {
      get: () => Array.from(model._coincidences.values()),
      set: action(coincidences => model._coincidences = new Set<number>(coincidences))
    }
  });

  return model;
};