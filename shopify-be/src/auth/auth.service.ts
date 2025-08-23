import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dtos/login.dto';
import bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FAType, PayloadType } from './types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne({ email: loginDTO.email });
    const passowrdMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!passowrdMatched)
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu sai!');

    const payload: PayloadType = {
      userId: user.id,
      email: user.email,
    };

    const artist = await this.artistService.findArtist(user.id);
    if (artist) payload.artistId = artist.id;

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findOne({ id: userId });

    if (user.enable2FA) return { secret: user.twoFASecret };

    const secret = speakeasy.generateSecret();
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);

    return { secret: user.twoFASecret };
  }

  async validate2FAToken(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      const user = await this.userService.findOne({ id: userId });

      const verified = speakeasy.totp.verify({
        secret: user.twoFASecret,
        token: token,
        encoding: 'base32',
      });

      if (verified) return { verified: true };
      else return { verified: false };
    } catch (error) {
      throw new UnauthorizedException('Lỗi khi xác minh token');
    }
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return await this.userService.disable2FA(userId);
  }
}
