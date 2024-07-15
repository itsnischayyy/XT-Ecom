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
import { ProductsService } from '../products/product.service';
import { ProductsRepository } from '../products/repositories/product.repository';
import { TestingHandler } from './commands/handlers/testing.handler';

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
    TestingHandler,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'IProductsRepository',
      useClass: ProductsRepository,
    },
    UnitOfWork,
    ProductsService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
