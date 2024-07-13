import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../utils/prisma.service';
import { PasswordService } from 'src/utils/password/password.service';

@Injectable()
export class UserService {
  constructor(private passwordService: PasswordService) {}

  private prisma = new PrismaService();
  private queryIn = this.prisma.user;

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const hashedPassword = this.passwordService.hashPassword(data.password);
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
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
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
