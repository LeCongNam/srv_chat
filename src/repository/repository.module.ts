import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/domain/chats/message.entity';
import { MessageRepository } from 'src/domain/chats/message.repository';
import { Group, GroupSchema } from 'src/domain/groups/group.entity';
import { GroupRepository } from 'src/domain/groups/group.repository';
import { User, UserSchema } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/domain/user/user.repository';

const providers = [UserRepository, GroupRepository, MessageRepository];

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Group.name, schema: GroupSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers,
  exports: providers,
})
export class RepositoryModule {}
