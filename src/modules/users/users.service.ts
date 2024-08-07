import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UserSignInDto } from './dtos/user-signin.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRegisteredEvent } from './events/user-registered.event';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { IUsersRepository } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
    private eventBus: EventBus,
  ) { }

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    try {
      const userExists = await this.userRepository.findOneByEmail(userSignUpDto.email);
      if (userExists) throw new BadRequestException('Email is not available.');
      userSignUpDto.password = await hash(userSignUpDto.password, 10);
      const user = new UserEntity();
      Object.assign(user, userSignUpDto);
      const createdUser = await this.userRepository.create(user);
      delete createdUser.password;
      this.eventBus.publish(new UserRegisteredEvent(user.id, user.email));
      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.userRepository.findOneByEmail(userSignInDto.email);
    if (!userExists) throw new BadRequestException('Bad credentials.');
    const matchPassword = await compare(userSignInDto.password, userExists.password);
    if (!matchPassword) throw new BadRequestException('Bad credentials.');
    delete userExists.password;
    return userExists;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findOneById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneById(id);
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneById(id);
  }

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneByUsername(username);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    return await this.userRepository.remove(id);
  }

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneByEmail(email);
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRE },
    );
  }
}
