import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserHttpService } from '../user/user.http';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ChatController],
  providers: [ChatService, UserHttpService],
})
export class ChatModule {}
