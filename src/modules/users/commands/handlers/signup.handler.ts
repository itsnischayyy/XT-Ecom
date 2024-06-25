// src/users/commands/handlers/signup.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from '../impl/signup.command';
import { UsersService } from '../../users.service';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: SignUpCommand) {
    const { userSignUpDto } = command;
    return this.usersService.signup(userSignUpDto);
  }
}