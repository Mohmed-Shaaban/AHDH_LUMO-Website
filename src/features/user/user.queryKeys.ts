export const userKeys = {
  all: ['user'] as const,
  me: (token?: string) => [...userKeys.all, 'me', token] as const,
};
