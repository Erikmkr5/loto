import { ITEMS_IN_ROW } from './cnst';
import { asArray } from '../../../Shared/utils';

export const splitOnChunks = <T = any>(d: T | T[], size: number = ITEMS_IN_ROW): T[][] => {
  const data = asArray(d);
  const chunks = [];

  while (data.length) {
    chunks.push(data.splice(0, size));
  }

  return chunks;
};