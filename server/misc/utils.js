import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ENV_VARIABLES} from './cnst.js';

export const noop = () => {};

export const isNull = (d) => d === null;

export const isUndefined = (d) => d === undefined;

export const isTrue = (d) => !!d;

export const isFalse = (d) => !d;

export const isValue = (d) => !isNull(d) && !isUndefined(d);

export const isFunction = (d) => typeof d === 'function';

export const isPromise = (d) => isFunction(d?.then);

export const asArray = (val) => Array.isArray(val) ? val : [val];

export const asPromise = (d) => isPromise(d) ? d : new Promise((resolve) => resolve(d));

export const asFunction = (...args) => {
  const _args = Array.from(args);
  const fn = _args.shift();

  return isFunction(fn) && fn.apply(null, _args);
};

export const digOut = (..._args) => {
  let args = Array.from(_args);
  let base = args.shift();
  let i = 0;

  try {
    let val = (base && base[args[i]]) || undefined;
    let len = args.length;

    if (val) while ((len - 1) > i++) {
      let _val = val[args[i]];
      if (!isUndefined(_val)) {
        val = _val;
      } else {
        val = undefined;
        i = len;
      }
    }
    return val;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const handleError = (err, res) => {
  console.log(err);
  res.status(err.status || 500).send({statusText: digOut(err, 'statusText') || digOut(err, 'text') || err});
};

export const getUid = () => bcrypt.genSaltSync();

export const cloneObject = (d) => JSON.parse(JSON.stringify(d));

export const createToken = (email) => {
  const timestamp =  new Date().getTime();
  const token = jwt.sign({email, timestamp}, ENV_VARIABLES.CRYPTO_KEY);

  return {email, timestamp, token};
};

export const encryptPassword = (password, salt = 10) => bcrypt.hash(password, salt);

export const checkPassword = (password, hash) => bcrypt.compareSync(password, hash);
