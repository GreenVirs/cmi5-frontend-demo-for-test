export const BASE_URL = 'http://localhost:3000/api';
export const returnError = (err: unknown) => Promise.reject(err);

const initOptions: RequestInit = {
  mode: 'cors',
  cache: 'no-cache',
};
const createOptions = (options?: RequestInit) => {
  const opt: RequestInit =
    typeof options !== 'undefined' ? { ...initOptions, ...options } : { ...initOptions };
  return opt;
};

const checkResponse = (res: Response) =>
  res.ok ? res.json() : res.json().then(returnError).catch(returnError);

const fetchWithOptions = (url: RequestInfo, options?: RequestInit) => {
  const opt = createOptions(options);
  return fetch(url, opt);
};

export const appFetch = async <T>(url: RequestInfo, options?: RequestInit): Promise<T> => {
  try {
    const res = await fetchWithOptions(url, options);
    return await checkResponse(res);
  } catch (err) {
    return returnError(err);
  }
};
