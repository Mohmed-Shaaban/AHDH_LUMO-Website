export function endpoint<Path extends string>(
  path: Path,
): EndpointFunction<Path> {
  return ((params?: ExtractParams<Path>) => {
    let finalPath = path as string;

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        finalPath = finalPath.replace(
          `:${key}`,
          encodeURIComponent(String(value)),
        );
      });
    }

    return finalPath;
  }) as EndpointFunction<Path>;
}
