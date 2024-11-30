import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/share/base.entity';

@Schema({
  timestamps: true,
})
export class User extends BaseEntity {
  constructor(data: any) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  @Prop()
  username: string;

  @Prop()
  fullName: string;

  @Prop({
    type: Array,
    default: [],
  })
  @Exclude()
  devices: Array<any>;

  @Prop({
    type: Array,
    default: [],
  })
  @Exclude()
  tokens: Array<any>;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  @Exclude({
    toClassOnly: true,
  })
  password: string;

  @Prop({
    unique: true,
  })
  phoneNumber: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isEmailVerify: boolean;

  @Prop({
    type: String,
    default: null,
  })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = genSaltSync(10);
    this.password = hashSync(this.password, salt);
  }
  next();
});
