import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dtos/login.dto';
import bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne({ email: loginDTO.email });
    const passowrdMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!passowrdMatched)
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu sai!');

    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
