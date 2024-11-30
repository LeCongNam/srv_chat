import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/share/base.repository';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends BaseRepositoryAbstract<User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
