// src/users/queries/handlers/get-user.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { UsersService } from '../../users.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute(query: GetUserQuery) {
    // return this.usersService.findOne(query.id);
  }
}