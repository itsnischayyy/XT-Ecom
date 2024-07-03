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
import { UserEntity } from './entities/user.entity';
import { Response } from 'express';
import { Roles } from '../utility/common/user-roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../utility/decorators/current-user.decorator';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus,
    ) {}
  
    @Post('signup')
    async signup(@Body() userSignUpDto: UserSignUpDto): Promise<UserEntity> {
      const createdUser : UserEntity = await this.commandBus.execute(new SignUpCommand(userSignUpDto));
      return createdUser;
    }
  
    @Post('signin')
    async signin(@Body() userSignInDto: UserSignInDto) {
      return this.commandBus.execute(new SignInCommand(userSignInDto));
    }
  
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
  