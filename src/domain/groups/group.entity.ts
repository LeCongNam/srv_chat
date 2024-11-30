import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from 'src/share/base.entity';
import { v7 as uuidv7 } from 'uuid';

@Schema()
export class Group extends BaseEntity {
  @Prop()
  groupId: string;

  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  avatar: string;

  @Prop({
    default: null,
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

GroupSchema.pre('save', function (next) {
  if (this.isModified('messageId')) {
    this.groupId = uuidv7();
  }

  if (this.isModified('createdBy')) {
    this.createdBy = new Types.ObjectId(this.createdBy);
  }

  next();
});
