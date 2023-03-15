export const isNull = (val: any): boolean => val === null;

export const isTrue = (val: any): boolean => !!val;

export const asArray = <T = any>(val: T | T[]): T[] => Array.isArray(val) ? val : [val];

export const asClassList = (vals: any): string => asArray(vals).filter(isTrue).join(' ');

