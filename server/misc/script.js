import {isUndefined, asPromise, isPromise, asFunction, isFunction} from './utils.js';

export class Script {

  _steps = [];

  _isStopped = false;

  _value = undefined;

  stop = () => {
    this._isStopped = true;
    return this;
  };

  run = (resolver = null) => {
    let resolve, reject;

    const doStep = (val = undefined, i = 0) => {
      const step = this._steps[i];

      this._value = val;

      this._isStopped || isUndefined(step)
        ? resolve(this._value)
        : asPromise(
          isPromise(step)
            ? step
            : asFunction(step, this._value)
        )
          .then(val => doStep(val, i + 1))
          .catch(err => reject(err));
    };

    const core = new Promise((_resolve, _reject) => {
      resolve = isFunction(resolver) ? () => resolver(this._value, null) : _resolve;
      reject = isFunction(resolver) ? err => resolver(null, err) : _reject;

      return doStep();
    });

    return isFunction(resolver) ? this : core;
  };

  constructor(...steps) {
    this._steps = [...Array.from(steps)];
  }
}
