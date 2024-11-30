import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class MongodbIDPipe implements PipeTransform {
  transform(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`value: "${value}" is incorrect format`);
    }

    return value;
  }
}
