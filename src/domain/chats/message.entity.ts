import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { v7 as uuidv7 } from 'uuid';
import { BaseEntity } from '../../share/base.entity';
import { Group } from '../groups/group.entity';
import { User } from '../user/user.entity';

@Schema()
export class Message extends BaseEntity {
  constructor(data: any) {
    super();

    if (data) {
      Object.assign(this, data);
    }
  }

  @Prop()
  messageId: string;

  @Prop()
  messageType: string;

  @Prop()
  content: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  sender: User;

  @Prop({ type: SchemaTypes.ObjectId, ref: Group.name })
  group: Group;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

MessageSchema.pre('save', function (next) {
  if (this.isModified('messageId')) {
    this.messageId = uuidv7();
  }
  next();
});
