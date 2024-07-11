import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  private queryIn = prisma.user

  async createUser(data: Prisma.UserCreateInput) {
    return this.queryIn.create({
      data,
    });
  }
}
