import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return await this.userService.getByUserName(username);
  }

  @Post('create')
  async createOne(@Body() data: Prisma.UserCreateInput): Promise<any> {
    return await this.userService.createUser(data);
  }

  @Put(':username')
  async softDeleteUser(@Param('username') username: string) {
    return await this.userService.softDeleteUser(username);
  }
}
