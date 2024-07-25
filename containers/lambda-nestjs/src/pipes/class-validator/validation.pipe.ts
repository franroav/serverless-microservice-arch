import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Utils } from '../../utils/utils.helper';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    let valid: boolean = true; 
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const keys = Object.keys(object);
    const dtoErrors = keys.map(async (key) => {
      const errors = await validate(object[key]);
      if (errors.length) {
          const [error] = errors
          return error
      }
    })
    const dtosIssues = await Promise.all(dtoErrors)
    const errors = dtosIssues.filter(a => a !== undefined )
    // validate DTO's request issues 
    const utils = new Utils();
    if (errors.length > 0) {
      const message = utils.dtoValidationErrorMessage(dtosIssues);
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
      //throw new BadRequestException(message);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}