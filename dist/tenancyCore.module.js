"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TenancyCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenancyCoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("mongoose");
let TenancyCoreModule = TenancyCoreModule_1 = class TenancyCoreModule {
    static register(uri, getDbName) {
        const tenancyModuleUriProvider = {
            provide: 'TENANT_MODULE_URI',
            useValue: uri,
        };
        const connectionMapProvider = this.createConnectionMapProvider();
        const tenantContextProvider = this.createTenantContextProvider(getDbName);
        const modelDefinitionMapProvider = this.createModelDefinitionMapProvider();
        const providers = [
            tenancyModuleUriProvider,
            tenantContextProvider,
            connectionMapProvider,
            modelDefinitionMapProvider,
            {
                provide: 'TENANT_CONNECTION',
                useFactory: async (database, uri, connMap, modelDefMap) => {
                    return await this.getConnection(database, uri, connMap, modelDefMap);
                },
                inject: ['TENANT_CONTEXT', 'TENANT_MODULE_URI', 'CONNECTION_MAP', 'MODEL_DEFINITION_MAP'],
            },
        ];
        return {
            module: TenancyCoreModule_1,
            providers: providers,
            exports: providers,
        };
    }
    static async getConnection(database, uri, connMap, modelDefMap) {
        if (!database)
            return;
        const exists = connMap.has(database);
        if (exists) {
            const connection = connMap.get(database);
            return connection;
        }
        const tentantURI = `${uri}/${database}`;
        const connection = (0, mongoose_1.createConnection)(tentantURI);
        modelDefMap.forEach((definition) => {
            const { name, schema, collection } = definition;
            connection.model(name, schema, collection);
        });
        connMap.set(database, connection);
        return connection;
    }
    static createConnectionMapProvider() {
        return {
            provide: 'CONNECTION_MAP',
            useFactory: () => new Map(),
        };
    }
    static createModelDefinitionMapProvider() {
        return {
            provide: 'MODEL_DEFINITION_MAP',
            useFactory: () => new Map(),
        };
    }
    static createTenantContextProvider(getDbName) {
        return {
            provide: 'TENANT_CONTEXT',
            scope: common_1.Scope.REQUEST,
            useFactory: (req) => {
                const dbName = getDbName(req);
                return dbName;
            },
            inject: [core_1.REQUEST],
        };
    }
};
exports.TenancyCoreModule = TenancyCoreModule;
exports.TenancyCoreModule = TenancyCoreModule = TenancyCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], TenancyCoreModule);
//# sourceMappingURL=tenancyCore.module.js.map