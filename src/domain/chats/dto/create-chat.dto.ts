import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CHAT_CONSTANT } from '../chat.constant';

export class CreateChatDto {
  @IsEnum(CHAT_CONSTANT.TYPES)
  messageType: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  group: string;
}
