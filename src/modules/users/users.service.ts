import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dtos/user-signin.dto';
import { sign } from 'jsonwebtoken';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRegisteredEvent } from './events/user-registered.event';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private eventBus: EventBus,
  ) { }

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    try {
      const userExists = await this.findUserByEmail(userSignUpDto.email);
      if (userExists) throw new BadRequestException('Email is not available.');
      userSignUpDto.password = await hash(userSignUpDto.password, 10);
      let user = this.userRepository.create(userSignUpDto);
      user = await this.userRepository.save(user);
      delete user.password;
      this.eventBus.publish(new UserRegisteredEvent(user.id, user.email));
      return user;
    } catch (err) {
      return err;
    }

  }

  async create(userSignUpDto: CreateUserDto): Promise<UserEntity> {
    try {
      console.log('userCreated');
    } catch (err) {
      return err;
    }

  }

  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const userExists = await this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();
    if (!userExists) throw new BadRequestException('Bad creadentials.');
    const matchPassword = await compare(
      userSignInDto.password,
      userExists.password,
    );
    if (!matchPassword) throw new BadRequestException('Bad creadentials.');
    delete userExists.password;
    return userExists;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('user not found.');
    return user;
  }

  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(id);
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRE },
    );
  }
}
