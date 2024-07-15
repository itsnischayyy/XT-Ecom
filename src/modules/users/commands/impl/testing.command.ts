// src/users/commands/impl/signup.command.ts

import { UserSignUpDto } from "../../dtos/user-signup.dto";

export class TestingCommand {
  constructor(public readonly userSignUpDto: UserSignUpDto) {}
}
