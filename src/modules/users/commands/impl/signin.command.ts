// src/users/commands/impl/signin.command.ts

import { UserSignInDto } from "../../dtos/user-signin.dto";

export class SignInCommand {
  constructor(public readonly userSignInDto: UserSignInDto) {}
}