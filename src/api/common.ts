import { appFetch, BASE_URL } from './index';

export const find = <T>(
  entrypoint: string,
  args?: URLSearchParams | null,
  options?: RequestInit
): Promise<T[]> => {
  const url = `${BASE_URL}/${entrypoint}${args ? `?${new URLSearchParams(args).toString()}` : ''}`;
  const opt = typeof options === 'undefined' ? { method: 'GET' } : { method: 'GET', ...options };
  return appFetch<T[]>(url, opt);
};

export const findOne = <T>(
  entrypoint: string,
  args?: URLSearchParams | null,
  options?: RequestInit
): Promise<T> => {
  const url = `${BASE_URL}/${entrypoint}${args ? `?${new URLSearchParams(args).toString()}` : ''}`;
  const opt = typeof options === 'undefined' ? { method: 'GET' } : { method: 'GET', ...options };
  return appFetch<T>(url, opt);
};

export const create = <T>(
  entrypoint: string,
  data: Record<string, unknown>,
  options?: RequestInit
): Promise<T> => {
  const opt =
    typeof options === 'undefined'
      ? { method: 'POST', body: JSON.stringify(data) }
      : { method: 'POST', ...options, body: JSON.stringify(data) };

  return appFetch<T>(`${BASE_URL}/${entrypoint}`, opt);
};

export const update = <T>(
  entrypoint: string,
  data: Record<string, unknown>,
  options?: RequestInit
): Promise<T> => {
  const opt =
    typeof options === 'undefined'
      ? { method: 'PUT', body: JSON.stringify(data) }
      : { method: 'PUT', ...options, body: JSON.stringify(data) };

  return appFetch<T>(`${BASE_URL}/${entrypoint}`, opt);
};

export const patch = <T>(
  entrypoint: string,
  data: Record<string, unknown>,
  options?: RequestInit
): Promise<T> => {
  const opt =
    typeof options === 'undefined'
      ? { method: 'PATCH', body: JSON.stringify(data) }
      : { method: 'PATCH', ...options, body: JSON.stringify(data) };

  return appFetch<T>(`${BASE_URL}/${entrypoint}`, opt);
};
export const remove = <T>(entrypoint: string, options?: RequestInit): Promise<T> => {
  const opt =
    typeof options === 'undefined' ? { method: 'DELETE' } : { method: 'DELETE', ...options };

  return appFetch<T>(`${BASE_URL}/${entrypoint}`, opt);
};
