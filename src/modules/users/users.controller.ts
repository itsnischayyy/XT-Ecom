import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Res,
  } from '@nestjs/common';
  import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
  import { CreateUserCommand } from './commands/impl/create-user.command';
  import { SignUpCommand } from './commands/impl/signup.command';
  import { SignInCommand } from './commands/impl/signin.command';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UserSignInDto } from './dtos/user-signin.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetAllUsersQuery } from './queries/impl/get-all-users.query';
import { GetUserQuery } from './queries/impl/get-user.query';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { Roles } from '../utility/common/user-roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UnitOfWork } from '../utility/common/unit-of-work';
import { UserRegisteredEvent } from './events/user-registered.event';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly usersService: UsersService,
      private readonly queryBus: QueryBus,
      // private readonly unitOfWork: UnitOfWorkService,
      private readonly unitOfWork: UnitOfWork,
      private eventBus: EventBus,
    ) {}
  
    @Post('signup')
    async signup(@Body() userSignUpDto: UserSignUpDto): Promise<UserEntity> {
      return await this.unitOfWork.run(async () => {
        // return this.usersService.signup(userSignUpDto);
      const createdUser : UserEntity = await this.commandBus.execute(new SignUpCommand(userSignUpDto));
      // const user = await this.usersService.signup(userSignUpDto);
      return createdUser;
      });
    }
    
    @Post('signin')
    async signin(@Body() userSignInDto: UserSignInDto) {
      return await this.unitOfWork.run(async () => {
        return this.commandBus.execute(new SignInCommand(userSignInDto));
      });
    }
    
        // @Post('signup')
        // async signup(@Body() userSignUpDto: UserSignUpDto): Promise<UserEntity> {
        //   return this.unitOfWork.doTransactional(async (): Promise<UserEntity> => {
        //     const user = await this.usersService.signup(userSignUpDto);
        //     return user;
        //   });
        //   // const createdUser : UserEntity = await this.commandBus.execute(new SignUpCommand(userSignUpDto));
        //   // const user = await this.usersService.signup(userSignUpDto);
        //   // return user;
        // }
    
      //   @Post()
      // async create(@Body() orderDto: CreateOrderRequestDto) {
      //   return this.unitOfWork.doTransactional(async (): Promise<Order> => {
      //     return this.orderService.createOrder(orderDto);
      //   });
      // }
    
    // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
    // @UseGuards(JwtAuthGuard)
    // @Get('all')
    // async findAll(@CurrentUser() user: any) {
    //   return this.queryBus.execute(new GetAllUsersQuery());
    // }
  
    // @Get('single/:id')
    // async findOne(@Param('id') id: string) {
    //   return this.queryBus.execute(new GetUserQuery(+id));
    // }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   // Create and execute update user command
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   // Create and execute remove user command
    // }
  
    // @UseGuards(AuthenticationGuard)
    // @Get('me')
    // getProfile(@CurrentUser() currentUser) {
    //   return currentUser;
    // }
  }
  