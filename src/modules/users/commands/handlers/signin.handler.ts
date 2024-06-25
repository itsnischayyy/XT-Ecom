// src/users/commands/handlers/signin.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '../impl/signin.command';
import { UsersService } from '../../users.service';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: SignInCommand) {
    const { userSignInDto } = command;
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }
}