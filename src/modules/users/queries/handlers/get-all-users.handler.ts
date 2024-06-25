// src/users/queries/handlers/get-all-users.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../impl/get-all-users.query';
import { UsersService } from '../../users.service';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute(query: GetAllUsersQuery) {
    return this.usersService.findAll();
  }
}