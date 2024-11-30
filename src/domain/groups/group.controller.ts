import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { BaseController } from 'src/share/base.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController extends BaseController {
  constructor(private readonly groupService: GroupService) {
    super();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGroupDto: CreateGroupDto, @Req() req: Request) {
    const user = this.getUser(req);
    const { authorization: accessToken } = req.headers;

    return this.groupService.create(createGroupDto, user, accessToken);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
