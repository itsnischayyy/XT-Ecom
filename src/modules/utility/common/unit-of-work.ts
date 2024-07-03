import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { DataSource, QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UnitOfWork {
  private queryRunner: QueryRunner;

  constructor(private readonly dataSource: DataSource) {}

  async start() {
    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commit() {
    await this.queryRunner.commitTransaction();
  }

  async rollback() {
    await this.queryRunner.rollbackTransaction();
  }

  async release() {
    await this.queryRunner.release();
  }

  getRepository<T>(entity: { new(): T }): Repository<T> {
    return this.queryRunner.manager.getRepository(entity);
  }

  getUsersRepository(): UsersRepository {
    return this.queryRunner.manager.getCustomRepository(UsersRepository);
  }
}
