type PathParamValue = string | number;

// Extract path params from string like "/users/:userId/posts/:postId"
type ExtractParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: PathParamValue }
    : Path extends `${string}:${infer Param}`
      ? { [K in Param]: PathParamValue }
      : undefined;

type EndpointFunction<Path extends string> =
  keyof ExtractParams<Path> extends undefined
    ? () => string
    : (params: ExtractParams<Path>) => string;
