import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/domain/user/user.entity';

@Controller()
@UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
export class BaseController {
  public getUser(req: Request): User | null {
    return (req?.user && new User(req.user)) ?? null;
  }
}
