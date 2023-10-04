const DEFAULT_DBCONTEXT_DB_CONNECTION = 'DbContextConnection';

export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

/**
 * Get dbContext model definition name
 *
 * @export
 * @param {string} model
 * @returns
 */
export function getDbContextModelDefinitionToken(model: string) {
  return `${model}Definition`;
}

/**
 * Get the connecion token name formatted
 *
 * @export
 * @param {string} [name]
 * @returns
 */
export function getDbContextConnectionToken(name?: string) {
  return name && name !== DEFAULT_DBCONTEXT_DB_CONNECTION ? `${name}DbContextConnection` : DEFAULT_DBCONTEXT_DB_CONNECTION;
}

export function getDbContextModelToken(model: string) {
  return `${model}Model`;
}
