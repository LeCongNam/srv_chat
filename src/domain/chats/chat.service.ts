import { Injectable } from '@nestjs/common';
import { UserHttpService } from 'src/domain/user/user.http';
import { Group } from '../groups/group.entity';
import { User } from '../user/user.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class ChatService {
  constructor(
    private _userHttpService: UserHttpService,
    private readonly _messageRepo: MessageRepository,
  ) {}

  async create(createChatDto: CreateChatDto, user: User, token: string) {
    const userResponse = await this._userHttpService.getOne(user._id, token);

    const message = await this._messageRepo.create({
      ...createChatDto,
      sender: userResponse._id,
    });

    return this._messageRepo
      .getModel()
      .findOne({ _id: message._id })
      .populate(Group.name.toLowerCase());
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
