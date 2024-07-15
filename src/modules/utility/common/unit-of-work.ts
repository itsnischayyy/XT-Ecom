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


// import { Injectable } from '@nestjs/common';
// import { Connection, QueryRunner, Repository } from 'typeorm';
// import { EventBus } from '@nestjs/cqrs';

// @Injectable()
// export class UnitOfWork {
//   private queryRunner: QueryRunner;
//   private events: any[] = [];
//   private logs: any[] = [];

//   constructor(
//     private readonly connection: Connection,
//     private readonly eventBus: EventBus,
//   ) {}

//   async run<T>(work: () => Promise<T>): Promise<T> {
//     this.queryRunner = this.connection.createQueryRunner();
//     await this.queryRunner.connect();
//     await this.queryRunner.startTransaction();

//     try {
//       const result = await work();
//       await this.queryRunner.commitTransaction();
//       this.publishEvents();
//       this.executeLogs();
//       return result;
//     } catch (err) {
//       await this.queryRunner.rollbackTransaction();
//       throw err;
//     } finally {
//       await this.queryRunner.release();
//       this.clearEvents();
//       this.clearLogs();
//     }
//   }

//   collectEvent(event: any) {
//     this.events.push(event);
//   }

//   log(message: any) {
//     this.logs.push(message);
//   }

//   getRepository<T>(entity: { new(): T }): Repository<T> {
//     return this.queryRunner.manager.getRepository(entity);
//   }

//   getQueryRunner(): QueryRunner {
//     return this.queryRunner;
//   }

//   private publishEvents() {
//     this.events.forEach(event => this.eventBus.publish(event));
//   }

//   private executeLogs() {
//     this.logs.forEach(log => console.log(log));
//   }

//   private clearEvents() {
//     this.events = [];
//   }

//   private clearLogs() {
//     this.logs = [];
//   }
// }

import { Injectable, Inject } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class UnitOfWork {
  private queryRunner: QueryRunner;
  private events: any[] = [];
  private logs: any[] = [];

  constructor(
    private readonly connection: Connection,
    private readonly eventBus: EventBus,
  ) {}

  async run<T>(work: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    this.queryRunner = this.connection.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const result = await work(this.queryRunner);
      await this.queryRunner.commitTransaction();
      this.publishEvents();
      this.executeLogs();
      return result;
    } catch (err) {
      await this.queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await this.queryRunner.release();
      this.clearEvents();
      this.clearLogs();
    }
  }

  collectEvent(event: any) {
    this.events.push(event);
  }

  log(message: any) {
    this.logs.push(message);
  }

  getRepository<T>(entity: { new (): T }) {
    return this.queryRunner.manager.getRepository(entity);
  }

  getQueryRunner(): QueryRunner {
    return this.queryRunner;
  }

  private publishEvents() {
    this.events.forEach(event => this.eventBus.publish(event));
  }

  private executeLogs() {
    this.logs.forEach(log => console.log(log));
  }

  private clearEvents() {
    this.events = [];
  }

  private clearLogs() {
    this.logs = [];
  }
}
