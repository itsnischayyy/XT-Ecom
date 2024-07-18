import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/product.module';
import { EmailModule } from './modules/email/email.module';
import { dataSourceOptions } from '../database/data-source';
import { OrdersModule } from './modules/orders/order.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CqrsModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    EmailModule,
    AuthModuleOptions,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
