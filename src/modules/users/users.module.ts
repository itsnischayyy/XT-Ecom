import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { SignUpHandler } from './commands/handlers/signup.handler';
import { SignInHandler } from './commands/handlers/signin.handler';
import { GetAllUsersHandler } from './queries/handlers/get-all-users.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { IUsersRepository } from './interfaces/users.interface';
import { UnitOfWork } from '../utility/common/unit-of-work';
import { UnitOfWorkService } from '../utility/common/unit-of-work-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserHandler,
    SignUpHandler,
    SignInHandler,
    GetAllUsersHandler,
    GetUserHandler,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    UnitOfWork,
    UnitOfWorkService,
    UnitOfWork,
  ],
  exports: [UsersService],
})
export class UsersModule {}
