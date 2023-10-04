"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTenancyProviders = void 0;
const utils_1 = require("../utils");
const createTenancyProviders = (definitions) => {
    const providers = [];
    for (const definition of definitions) {
        const { name, schema, collection } = definition;
        providers.push({
            provide: (0, utils_1.getTenantModelDefinitionToken)(name),
            useFactory: (modelDefinitionMap, connectionMap) => {
                const exists = modelDefinitionMap.has(name);
                if (!exists) {
                    modelDefinitionMap.set(name, { ...definition });
                }
            },
            inject: ['MODEL_DEFINITION_MAP', 'CONNECTION_MAP'],
        });
        providers.push({
            provide: (0, utils_1.getTenantModelToken)(name),
            useFactory(tenantConnection) {
                if (!tenantConnection)
                    return;
                return tenantConnection.models[name] || tenantConnection.model(name, schema, collection);
            },
            inject: ['TENANT_CONNECTION'],
        });
    }
    return providers;
};
exports.createTenancyProviders = createTenancyProviders;
//# sourceMappingURL=tenancy.factory.js.map