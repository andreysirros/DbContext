"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DbContextModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContextModule = void 0;
const common_1 = require("@nestjs/common");
const dbContextCore_module_1 = require("./dbContextCore.module");
const dbContextFeature_module_1 = require("./dbContextFeature.module");
let DbContextModule = DbContextModule_1 = class DbContextModule {
    static forRoot(uri, getDbName) {
        console.log('uri', uri);
        return {
            module: DbContextModule_1,
            imports: [dbContextCore_module_1.DbContextCoreModule.register(uri, getDbName)],
        };
    }
    static forFeature(models) {
        return {
            module: DbContextModule_1,
            imports: [dbContextFeature_module_1.DbContextFeatureModule.register(models)],
        };
    }
};
exports.DbContextModule = DbContextModule;
exports.DbContextModule = DbContextModule = DbContextModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], DbContextModule);
//# sourceMappingURL=dbContext.module.js.map