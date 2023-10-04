"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantModelToken = exports.getTenantConnectionToken = exports.getTenantModelDefinitionToken = exports.extractTokenFromHeader = void 0;
const DEFAULT_TENANT_DB_CONNECTION = 'TenantConnection';
const extractTokenFromHeader = (request) => {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
};
exports.extractTokenFromHeader = extractTokenFromHeader;
function getTenantModelDefinitionToken(model) {
    return `${model}Definition`;
}
exports.getTenantModelDefinitionToken = getTenantModelDefinitionToken;
function getTenantConnectionToken(name) {
    return name && name !== DEFAULT_TENANT_DB_CONNECTION ? `${name}TenantConnection` : DEFAULT_TENANT_DB_CONNECTION;
}
exports.getTenantConnectionToken = getTenantConnectionToken;
function getTenantModelToken(model) {
    return `${model}Model`;
}
exports.getTenantModelToken = getTenantModelToken;
//# sourceMappingURL=tenancy.utils.js.map