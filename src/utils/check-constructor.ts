export const getConstructor = (entry: unknown): string =>
  Object.prototype.toString.call(entry).slice(8, -1);

export const checkConstructor = (
  entry: unknown,
  target: { new (...args: any[]): unknown; prototype: unknown }
): boolean => getConstructor(entry) === target.name;
