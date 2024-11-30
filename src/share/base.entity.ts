import { Prop } from '@nestjs/mongoose';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';

export class BaseEntity {
  _id?: string;

  @Prop({ default: null })
  deletedAt: Date;

  public plainToInstance<T>(
    cls: ClassConstructor<T>,
    options?: ClassTransformOptions,
  ): T {
    return plainToInstance(cls, this, options);
  }
}
