import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../database/data-source';
import { InventoryModule } from './modules/inventory/inventory.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [AdminModule, OrdersModule, ProductsModule, UsersModule, EmailModule, TypeOrmModule.forRoot(dataSourceOptions),
    ProductsModule,
    InventoryModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
