import { checkConstructor } from '../utils/check-constructor';

export const BASE_URL = 'http://localhost:3000/api';
const headers = new Headers({
  'Content-Type': 'application/json;charset=utf-8',
});
export const returnError = (err: unknown) => Promise.reject(err);

const initOptions: RequestInit = {
  mode: 'cors',
  cache: 'no-cache',
};

const parseHeaders = (hdrs: HeadersInit) =>
  checkConstructor(hdrs, Headers) ? Object.fromEntries(Array.from(hdrs as Headers)) : { ...hdrs };

const mergeHeaders = (headersOne: HeadersInit, headersTwo: HeadersInit): Headers => {
  console.log('parseHeaders(headersTwo)', parseHeaders(headersTwo));
  return new Headers({ ...parseHeaders(headersOne), ...parseHeaders(headersTwo) });
};
const createOptions = (options?: RequestInit) => {
  console.log('options', options);
  console.log('checkConstructor(hdrs, Headers)', checkConstructor(options?.headers, Headers));
  const opt: RequestInit =
    typeof options !== 'undefined' ? { ...initOptions, ...options } : { ...initOptions };
  console.log('headers', opt.headers);
  opt.headers = typeof opt.headers !== 'undefined' ? mergeHeaders(headers, opt.headers) : headers;
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
