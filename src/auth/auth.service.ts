import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from 'src/services/password/password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  // private userService = new UserService();
  // private passwordService = new PasswordService();
  // private jwtService = new JwtService();

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getByUserName(username);
    const isPasswordCorrect = this.passwordService.comparePassword(
      password,
      user.password,
    );

    try {
      if (!user || !isPasswordCorrect) {
        throw new UnauthorizedException('Username or password is incorrect');
      }

      const payload = {
        sub: user.user_id,
        username: user.user_name,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
