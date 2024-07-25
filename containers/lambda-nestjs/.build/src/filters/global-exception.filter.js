"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionsFilters = void 0;
const common_1 = require("@nestjs/common");
let GlobalExceptionsFilters = class GlobalExceptionsFilters {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let error = null;
        if (exception instanceof common_1.HttpException) {
            if (exception.getStatus() == common_1.HttpStatus.FORBIDDEN ||
                exception.getStatus() == common_1.HttpStatus.BAD_REQUEST ||
                exception.getStatus() == common_1.HttpStatus.SERVICE_UNAVAILABLE ||
                exception.getStatus() == common_1.HttpStatus.NOT_ACCEPTABLE ||
                exception.getStatus() == common_1.HttpStatus.EXPECTATION_FAILED ||
                exception.getStatus() == common_1.HttpStatus.UNAUTHORIZED ||
                exception.getStatus() == common_1.HttpStatus.REQUEST_TIMEOUT ||
                exception.getStatus() == common_1.HttpStatus.BAD_GATEWAY ||
                exception.getStatus() == common_1.HttpStatus.GATEWAY_TIMEOUT ||
                exception.getStatus() == common_1.HttpStatus.EXPECTATION_FAILED ||
                exception.getStatus() == common_1.HttpStatus.NOT_FOUND ||
                exception.getStatus() == common_1.HttpStatus.CONFLICT ||
                exception.getStatus() == common_1.HttpStatus.TOO_MANY_REQUESTS) {
                status = exception.getStatus();
                error = exception.message;
            }
            else {
                error = 'Error interno del servidor';
            }
        }
        else {
            error = 'Error interno del servidor';
        }
        if (response.status) {
            response.status(status).json({
                statusCode: status,
                error: error || '',
                timestamp: new Date().toDateString(),
                path: request.url,
            });
        }
    }
};
GlobalExceptionsFilters = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionsFilters);
exports.GlobalExceptionsFilters = GlobalExceptionsFilters;
//# sourceMappingURL=global-exception.filter.js.map