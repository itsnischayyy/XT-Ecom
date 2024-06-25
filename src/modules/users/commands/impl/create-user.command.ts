// src/users/commands/impl/create-user.command.ts

import { CreateUserDto } from "../../dtos/create-user.dto";

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
