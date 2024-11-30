import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepositoryAbstract } from 'src/share/base.repository';
import { Message } from './message.entity';

@Injectable()
export class MessageRepository extends BaseRepositoryAbstract<Message> {
  constructor(
    @InjectModel(Message.name)
    private readonly MessageModel: Model<Message>,
  ) {
    super(MessageModel);
  }
}
