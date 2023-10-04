const DEFAULT_TENANT_DB_CONNECTION = 'TenantConnection';

export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [type, token] = request.headers['authorization']?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

/**
 * Get tenant model definition name
 *
 * @export
 * @param {string} model
 * @returns
 */
export function getTenantModelDefinitionToken(model: string) {
  return `${model}Definition`;
}

/**
 * Get the connecion token name formatted
 *
 * @export
 * @param {string} [name]
 * @returns
 */
export function getTenantConnectionToken(name?: string) {
  return name && name !== DEFAULT_TENANT_DB_CONNECTION ? `${name}TenantConnection` : DEFAULT_TENANT_DB_CONNECTION;
}

export function getTenantModelToken(model: string) {
  return `${model}Model`;
}
