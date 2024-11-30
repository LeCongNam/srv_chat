import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/share/base.repository';
import { Group } from './group.entity';

@Injectable()
export class GroupRepository extends BaseRepositoryAbstract<Group> {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
  ) {
    super(groupModel);
  }
}
