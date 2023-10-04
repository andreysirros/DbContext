"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectDbContextConnection = exports.InjectDbContextModel = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
const InjectDbContextModel = (model) => (0, common_1.Inject)((0, utils_1.getDbContextModelToken)(model));
exports.InjectDbContextModel = InjectDbContextModel;
const InjectDbContextConnection = (name) => (0, common_1.Inject)((0, utils_1.getDbContextConnectionToken)(name));
exports.InjectDbContextConnection = InjectDbContextConnection;
//# sourceMappingURL=dbContext.decorator.js.map