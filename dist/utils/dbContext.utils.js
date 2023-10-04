"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbContextModelToken = exports.getDbContextConnectionToken = exports.getDbContextModelDefinitionToken = exports.extractTokenFromHeader = void 0;
const DEFAULT_DBCONTEXT_DB_CONNECTION = 'DbContextConnection';
const extractTokenFromHeader = (request) => {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
};
exports.extractTokenFromHeader = extractTokenFromHeader;
function getDbContextModelDefinitionToken(model) {
    return `${model}Definition`;
}
exports.getDbContextModelDefinitionToken = getDbContextModelDefinitionToken;
function getDbContextConnectionToken(name) {
    return name && name !== DEFAULT_DBCONTEXT_DB_CONNECTION ? `${name}DbContextConnection` : DEFAULT_DBCONTEXT_DB_CONNECTION;
}
exports.getDbContextConnectionToken = getDbContextConnectionToken;
function getDbContextModelToken(model) {
    return `${model}Model`;
}
exports.getDbContextModelToken = getDbContextModelToken;
//# sourceMappingURL=dbContext.utils.js.map