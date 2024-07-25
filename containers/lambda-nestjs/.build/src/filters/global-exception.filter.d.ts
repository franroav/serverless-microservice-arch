import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class GlobalExceptionsFilters implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
