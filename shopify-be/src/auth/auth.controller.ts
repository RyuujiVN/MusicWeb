/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-users.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { Enable2FAType } from './types';
import { ValidateTokenDTO } from './dtos/validateToken.dto';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signup(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(
    @Request()
    req,
  ): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate-2fa')
  validate2FA(
    @Request()
    req,
    @Body()
    validateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      validateTokenDTO.token,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('disable-2fa')
  disable2FA(
    @Request()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }
}
