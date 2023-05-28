export const getConstructor = (entry: unknown): string =>
  Object.prototype.toString.call(entry).slice(8, -1);

export const checkConstructor = (entry: unknown, target: unknown): boolean =>
  getConstructor(entry) === getConstructor(target);
