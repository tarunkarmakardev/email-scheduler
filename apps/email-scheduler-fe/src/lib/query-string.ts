import queryString, { ParseOptions } from "query-string";

export function parseQueryString<T>(
  input: string,
  defaultValue: T,
  options?: ParseOptions
): T {
  const queryStringObject = queryString.parse(input, {
    parseBooleans: true,
    parseNumbers: true,
    ...options,
  }) as T;
  return {
    ...defaultValue,
    ...queryStringObject,
  };
}
