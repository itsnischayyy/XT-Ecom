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
  ],
})
export class UsersModule {}
