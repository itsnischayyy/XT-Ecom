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
import { QueryRunner } from 'typeorm';
import { UnitOfWork } from '../utility/common/unit-of-work';
import { ProductsService } from '../products/product.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository') private readonly userRepository: IUsersRepository,
    @InjectQueue('email') private readonly emailQueue: Queue,
    private eventBus: EventBus,
    private readonly unitOfWork: UnitOfWork,
    private readonly productsService: ProductsService,
  ) { }

async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    return await this.unitOfWork.run(async (queryRunner) => {
      const userExists = await this.userRepository.findOneByEmail(userSignUpDto.email);
      if (userExists) {
        throw new BadRequestException('Email is not available.');
      }

      userSignUpDto.password = await hash(userSignUpDto.password, 10);
      const user = await this.userRepository.create(userSignUpDto);

      // Create product example
      const testProduct = {
        "name": "testabcdefgh",
        "description": "test4",
        "price": 500
      };
      const prod = await this.productsService.create(testProduct, user);

      this.emailQueue.add('sendEmail', {
        email: userSignUpDto.email,
      });
      // this.emailQueue.add('sendEmail', {
      //   email: "1",
      // });
      // this.emailQueue.add('sendEmail', {
      //   email: "2",
      // });
      // this.emailQueue.add('sendEmail', {
      //   email: "3",
      // });
      // this.emailQueue.add('sendEmail', {
      //   email: "4",
      // });
      // this.emailQueue.add('sendEmail', {
      //   email: "5",
      // });
      // console.log('Time Out Started');
      // await setTimeout(() => {
      //   // console.log("Delayed for 1 second.");
      // }, 10000);
      // this.emailQueue.add('sendEmail2', {
      //   email: "7",
      // });
      // this.emailQueue.add('sendEmail2', {
      //   email: "8",
      // });
      // this.emailQueue.add('sendEmail2', {
      //   email: "9",
      // });
      // this.emailQueue.add('sendEmail2', {
      //   email: "10",
      // });
      // this.emailQueue.add('sendEmail2', {
      //   email: "11",
      // });
      // this.emailQueue.add('sendEmail2', {
      //   email: "12",
      // });

      // console.log("Email has been sent");

      // if (0 == 0) {
      //   throw new BadRequestException('Simulated failure after user creation.');
      // }

      // Collect event to be published after transaction commits
      // this.unitOfWork.collectEvent(new UserRegisteredEvent(user.id, user.email));
      // this.unitOfWork.log(`User with email ${userSignUpDto.email} created successfully.`);

      return user;
    });
  }



  async signin(userSignInDto: UserSignInDto): Promise<UserEntity> {
    const queryRunner = this.unitOfWork.getQueryRunner();
    const userExists = await queryRunner.manager.findOne(UserEntity, { where: { email: userSignInDto.email } });
    if (!userExists) throw new BadRequestException('Bad credentials.');
    const matchPassword = await compare(userSignInDto.password, userExists.password);
    if (!matchPassword) throw new BadRequestException('Bad credentials.');
    this.unitOfWork.log(`User with email ${userSignInDto.email} signedin successfully.`);
    delete userExists.password;
        // Simulate a failure to trigger rollback
    // if (0 == 0) {
    //   throw new BadRequestException('Simulated failure after user creation.');
    // }
    return userExists;
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRE },
    );
  }

  async signup2(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    return await this.unitOfWork.run(async (queryRunner) => {
      // const userExists = await this.userRepository.findOneByEmail(userSignUpDto.email);
      // if (userExists) {
      //   throw new BadRequestException('Email is not available.');
      // }

      const userTest = {
        "username": "testUser1",
        "email": "test1@gmail.com",
        "password": "testPassword"
      };

      userTest.password = await hash(userTest.password, 10);
      const user = await this.userRepository.create(userTest, queryRunner);

      // Create product example
      const testProduct = {
        "name": "testabcdefgh",
        "description": "test5",
        "price": 500
      };
      const prod = await this.productsService.create(testProduct, user, queryRunner);

      // Collect event to be published after transaction commits
      this.unitOfWork.collectEvent(new UserRegisteredEvent(user.id, user.email));
      this.unitOfWork.log(`User with email ${userTest.email} created successfully.`);

      return user;
    });
  }
}




  // async signup(userSignUpDto: UserSignUpDto, queryRunner: QueryRunner): Promise<UserEntity> {
  //   try {
  //     const userExists = await this.userRepository.findOneByEmail(userSignUpDto.email);
  //     if (userExists) throw new BadRequestException('Email is not available.');
  //     userSignUpDto.password = await hash(userSignUpDto.password, 10);
  //     const user = new UserEntity();
  //     Object.assign(user, userSignUpDto);
  //     const createdUser = await this.userRepository.create(user, queryRunner);
  //     delete createdUser.password;
  //     // this.eventBus.publish(new UserRegisteredEvent(user.id, user.email));
  //     if( 0 == 0){
  //       throw new BadRequestException('Email is not available.');
  //     }
  //     return createdUser;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  

  // async create(createUserDto: CreateUserDto): Promise<UserEntity> {
  //   try {
  //     return await this.userRepository.create(createUserDto);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async findAll(): Promise<UserEntity[]> {
  //   return await this.userRepository.findAll();
  // }

  // async findOneById(id: number): Promise<UserEntity> {
  //   return await this.userRepository.findOneById(id);
  // }

  // async findOne(id: number): Promise<UserEntity> {
  //   return await this.userRepository.findOneById(id);
  // }

  // async findOneByUsername(username: string): Promise<UserEntity | undefined> {
  //   return await this.userRepository.findOneByUsername(username);
  // }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
  //   return await this.userRepository.update(id, updateUserDto);
  // }

  // async remove(id: number): Promise<void> {
  //   return await this.userRepository.remove(id);
  // }

  
  // async findUserByEmail(email: string): Promise<UserEntity | undefined> {
  //   return await this.userRepository.findOneByEmail(email);
  // }