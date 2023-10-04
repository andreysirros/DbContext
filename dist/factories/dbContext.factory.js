"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbContextProviders = void 0;
const utils_1 = require("../utils");
const createDbContextProviders = (definitions) => {
    const providers = [];
    for (const definition of definitions) {
        const { name, schema, collection } = definition;
        providers.push({
            provide: (0, utils_1.getDbContextModelDefinitionToken)(name),
            useFactory: (modelDefinitionMap, connectionMap) => {
                const exists = modelDefinitionMap.has(name);
                if (!exists) {
                    modelDefinitionMap.set(name, { ...definition });
                }
            },
            inject: ['MODEL_DEFINITION_MAP', 'CONNECTION_MAP'],
        });
        providers.push({
            provide: (0, utils_1.getDbContextModelToken)(name),
            useFactory(dbContextConnection) {
                if (!dbContextConnection)
                    return;
                return dbContextConnection.models[name] || dbContextConnection.model(name, schema, collection);
            },
            inject: ['DBCONTEXT_CONNECTION'],
        });
    }
    return providers;
};
exports.createDbContextProviders = createDbContextProviders;
//# sourceMappingURL=dbContext.factory.js.map