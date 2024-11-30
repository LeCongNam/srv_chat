import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserHttpService } from '../user/user.http';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [GroupController],
  providers: [GroupService, UserHttpService],
})
export class GroupModule {}
