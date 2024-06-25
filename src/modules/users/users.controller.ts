import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { CommandBus, QueryBus } from '@nestjs/cqrs';
  import { CreateUserCommand } from './commands/impl/create-user.command';
  import { SignUpCommand } from './commands/impl/signup.command';
  import { SignInCommand } from './commands/impl/signin.command';
import { UserSignUpDto } from './dtos/user-signup.dto';
import { UserSignInDto } from './dtos/user-signin.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetAllUsersQuery } from './queries/impl/get-all-users.query';
import { GetUserQuery } from './queries/impl/get-user.query';
import { UpdateUserDto } from './dtos/update-user.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}
  
    @Post('signup')
    async signup(@Body() userSignUpDto: UserSignUpDto) {
      return this.commandBus.execute(new SignUpCommand(userSignUpDto));
    }
  
    @Post('signin')
    async signin(@Body() userSignInDto: UserSignInDto) {
      return this.commandBus.execute(new SignInCommand(userSignInDto));
    }
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.commandBus.execute(new CreateUserCommand(createUserDto));
    }
  
    // @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
    @Get('all')
    async findAll() {
      return this.queryBus.execute(new GetAllUsersQuery());
    }
  
    @Get('single/:id')
    async findOne(@Param('id') id: string) {
      return this.queryBus.execute(new GetUserQuery(+id));
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      // Create and execute update user command
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      // Create and execute remove user command
    }
  
    // @UseGuards(AuthenticationGuard)
    // @Get('me')
    // getProfile(@CurrentUser() currentUser) {
    //   return currentUser;
    // }
  }
  