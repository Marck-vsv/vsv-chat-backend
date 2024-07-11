import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  private readonly userService = new UserService();

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return await this.userService.getByUserName(username);
  }

  @Post('create')
  async createOne(@Body() data: Prisma.UserCreateInput): Promise<any> {
    return await this.userService.createUser(data);
  }
}
