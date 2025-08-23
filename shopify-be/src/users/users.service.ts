import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dtos/create-users.dto';
import bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const existedUser = await this.userRepository.findOne({
      where: { email: userDTO.email },
    });

    if (existedUser) throw new ConflictException('Email đã tồn tại');

    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);

    const user = await this.userRepository.save(userDTO);
    return plainToClass(User, user);
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: data });
    if (!user) {
      throw new UnauthorizedException(`Không tìm thấy user ${data.email}!`);
    }
    return user;
  }

  async updateSecretKey(
    userId: number,
    twoFASecret: string,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id: userId },
      {
        twoFASecret: twoFASecret,
        enable2FA: true,
      },
    );
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: '',
        enable2FA: false,
      },
    );
  }
}
