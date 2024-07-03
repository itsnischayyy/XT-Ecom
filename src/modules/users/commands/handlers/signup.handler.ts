// handlers/signup.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from '../impl/signup.command';
import { UsersService } from '../../users.service';
import { UserEntity } from '../../entities/user.entity';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: SignUpCommand): Promise<UserEntity> {
    // const { userSignUpDto } = command;
    // const createdUser = await this.usersService.signup(userSignUpDto);
    return null;
  }
}
