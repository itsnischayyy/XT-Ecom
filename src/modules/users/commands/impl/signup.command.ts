// src/users/commands/impl/signup.command.ts

import { UserSignUpDto } from "../../dtos/user-signup.dto";

export class SignUpCommand {
  constructor(public readonly userSignUpDto: UserSignUpDto) {}
}
