// import { Injectable } from '@nestjs/common';
// import { UsersRepository } from 'src/modules/users/repositories/users.repository';
// import { DataSource, QueryRunner, Repository } from 'typeorm';

// @Injectable()
// export class UnitOfWork {
//   private queryRunner: QueryRunner;
//   isActive: any;

//   constructor(private readonly dataSource: DataSource) {}

//   async start() {
//     this.queryRunner = this.dataSource.createQueryRunner();
//     await this.queryRunner.connect();
//     await this.queryRunner.startTransaction();
//   }

//   async commit() {
//     await this.queryRunner.commitTransaction();
//   }

//   async rollback() {
//     await this.queryRunner.rollbackTransaction();
//   }

//   async release() {
//     await this.queryRunner.release();
//   }

//   getRepository<T>(entity: { new(): T }): Repository<T> {
//     return this.queryRunner.manager.getRepository(entity);
//   }

//   getUsersRepository(): UsersRepository {
//     return this.queryRunner.manager.getCustomRepository(UsersRepository);
//   }
// }


import { Injectable } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UnitOfWork {
  private events: any[] = [];

  constructor(
    private readonly connection: Connection,
    private readonly eventBus: EventBus,
  ) {}

  async run<T>(work: (queryRunner: QueryRunner, collectEvent: (event: any) => void) => Promise<T>): Promise<T> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work(queryRunner, this.collectEvent.bind(this));
      await queryRunner.commitTransaction();
      this.publishEvents();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
      this.clearEvents();
    }
  }

  private collectEvent(event: any) {
    this.events.push(event);
  }

  private publishEvents() {
    this.events.forEach(event => this.eventBus.publish(event));
  }

  private clearEvents() {
    this.events = [];
  }
}

