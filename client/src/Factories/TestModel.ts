import { observable } from 'mobx';

export const TestModelFactory = () => {
  const model = observable({
    value: false,
    toggle: () => model.value = !model.value
  });

  return model;
};