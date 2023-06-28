export function watchAnyObject(
  object = {},
  methods = [],
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callbackBefore = function () {},
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callbackAfter = function () {}
) {
  // @ts-ignore
  // eslint-disable-next-line no-restricted-syntax
  for (const method of methods) {
    // @ts-ignore
    const original = object[method].bind(object);
    // @ts-ignore
    const newMethod = function (...args) {
      // @ts-ignore
      callbackBefore(method, ...args);
      // @ts-ignore
      // eslint-disable-next-line prefer-spread
      const result = original.apply(null, args);
      // @ts-ignore
      callbackAfter(method, ...args);
      return result;
    };
    // @ts-ignore
    object[method] = newMethod.bind(object);
  }
}
