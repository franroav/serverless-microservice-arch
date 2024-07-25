"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    dtoValidationErrorMessage(issues) {
        const errors = issues.filter(a => a !== undefined);
        let message = '';
        for (const error of errors) {
            const requestFails = error.children;
            const constraints = error.constraints;
            const property = error.property;
            const propertyValue = error.value;
            const keys = Object.keys(constraints);
            if (keys.length) {
                keys.forEach((key, i) => {
                    if (i !== 0) {
                        message = message + `Error de validación - Error de tipo ${key} en la propiedad ${property} se esta recibiendo con un valor igual a ${propertyValue} con mensaje: ${constraints[key]}...  `;
                    }
                    else {
                        message = `La solicitud presenta los siguientes problemas, Error de validación - Error de tipo ${key} en la propiedad ${property} se esta recibiendo con un valor igual a ${propertyValue} con mensaje: ${constraints[key]}...  `;
                    }
                });
            }
        }
        message = message + '.';
        return message;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.helper.js.map