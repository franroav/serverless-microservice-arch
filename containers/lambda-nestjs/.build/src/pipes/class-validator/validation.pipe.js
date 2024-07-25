"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const utils_helper_1 = require("../../utils/utils.helper");
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        let valid = true;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        const keys = Object.keys(object);
        const dtoErrors = keys.map(async (key) => {
            const errors = await (0, class_validator_1.validate)(object[key]);
            if (errors.length) {
                const [error] = errors;
                return error;
            }
        });
        const dtosIssues = await Promise.all(dtoErrors);
        const errors = dtosIssues.filter(a => a !== undefined);
        const utils = new utils_helper_1.Utils();
        if (errors.length > 0) {
            const message = utils.dtoValidationErrorMessage(dtosIssues);
            throw new common_1.HttpException(message, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map