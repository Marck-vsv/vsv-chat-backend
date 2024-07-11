import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  private readonly userService = new UserService();

  @Post('create')
  async createOne(@Body() data: Prisma.UserCreateInput): Promise<any> {
    return await this.userService.createUser(data);
  }
}
