import { Controller, Get, Post } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  constructor() {}

  @Get()
  getAllConversations() {}

  @Get()
  getAllRooms() {}

  @Post()
  createConversation() {}

  @Post()
  createRoom() {}
}
