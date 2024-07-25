"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config = require("./config/config");
const validation_pipe_1 = require("./pipes/class-validator/validation.pipe");
const global_exception_filter_1 = require("./filters/global-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Serverless Nest Mongo')
        .setDescription('Desafio Desarollador Fullstack')
        .setVersion('1.0')
        .addTag('items')
        .addTag('auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('documentation', app, document);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.enableCors();
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionsFilters());
    await app.listen(config.default.develoment.port);
}
bootstrap();
//# sourceMappingURL=main.js.map