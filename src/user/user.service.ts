import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { PasswordService } from '../services/password.service';

const prisma = new PrismaService();
const passwordService = new PasswordService();

@Injectable()
export class UserService {
  private queryIn = prisma.user;

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const hashedPassword = passwordService.hashPassword(data.password);
      const create_user = await this.queryIn.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      if (!create_user) {
        throw new ServiceUnavailableException('Could not create user');
      }

      return create_user;
    } catch (error) {
      console.error('Could not create user: ', error);
      throw error;
    }
  }

  async getByUserName(username: string) {
    try {
      const user = await this.queryIn.findFirst({
        where: {
          user_name: username,
        },
        select: {
          user_name: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        user_name: user.user_name,
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async softDeleteUser(username: string) {
    try {
      const softDeletedUser = this.queryIn.update<Prisma.UserUpdateArgs>({
        where: {
          user_name: username,
        },
        data: {
          password: '',
          public_name: 'Deleted User',
          phone_number: '',
          email: '',
          user_bio: '',
          chatChat_id: null,
          birth_date: null,
          deleted_at: new Date(),
        },
      });

      if (!softDeletedUser) {
        throw new ServiceUnavailableException('Could not delete user');
      }

      return softDeletedUser;
    } catch (error) {
      console.error('Could not delete user:', error);
      throw error;
    }
  }
}
