import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-users.dto';
import bcrypt from 'node_modules/bcryptjs';
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
}
