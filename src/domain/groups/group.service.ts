import { Injectable } from '@nestjs/common';
import { UserHttpService } from 'src/domain/user/user.http';
import { User } from '../user/user.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    private _userHttpService: UserHttpService,
    private _groupRepo: GroupRepository,
  ) {}

  async create(createGroupDto: CreateGroupDto, user: User, token: string) {
    const userResponse = await this._userHttpService.getOne(user._id, token);

    return this._groupRepo.create({
      ...createGroupDto,
      createdBy: userResponse._id,
    });
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
