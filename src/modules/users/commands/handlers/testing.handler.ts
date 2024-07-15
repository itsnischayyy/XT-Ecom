// handlers/signup.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TestingCommand } from '../impl/testing.command';
import { UsersService } from '../../users.service';
import { UserEntity } from '../../entities/user.entity';


@CommandHandler(TestingCommand)
export class TestingHandler implements ICommandHandler<TestingCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute(command: TestingCommand): Promise<UserEntity> {
    const { userSignUpDto } = command;
    const createdUser = await this.usersService.signup2(userSignUpDto);
    return createdUser;
  }
}
