"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TenancyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenancyModule = void 0;
const common_1 = require("@nestjs/common");
const tenancyCore_module_1 = require("./tenancyCore.module");
const tenancyFeature_module_1 = require("./tenancyFeature.module");
let TenancyModule = TenancyModule_1 = class TenancyModule {
    static forRoot(uri, getDbName) {
        console.log('uri', uri);
        return {
            module: TenancyModule_1,
            imports: [tenancyCore_module_1.TenancyCoreModule.register(uri, getDbName)],
        };
    }
    static forFeature(models) {
        return {
            module: TenancyModule_1,
            imports: [tenancyFeature_module_1.TenancyFeatureModule.register(models)],
        };
    }
};
exports.TenancyModule = TenancyModule;
exports.TenancyModule = TenancyModule = TenancyModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], TenancyModule);
//# sourceMappingURL=tenancy.module.js.map