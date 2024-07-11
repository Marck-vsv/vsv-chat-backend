import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  private queryIn = prisma.user;

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const create_user = await this.queryIn.create({
        data
      });
      
      if (!create_user) {
        throw new ServiceUnavailableException('Could not create user');
      }
      
      return create_user;
    } catch (error) {
      console.error('Could not create user: ', error);
      throw error
    }
  }
  
  async getByUserName(username: string) {
    try {
      const user = await this.queryIn.findFirst({
        where: {
          user_name: username
        },
        select: {
          user_name: true
        }
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      return user.user_name;
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }
}
