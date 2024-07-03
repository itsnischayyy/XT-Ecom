import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderEntity } from './entities/order.entity';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { OrdersRepository } from './repositories/orders.repository';

// const CommandHandlers = [CreateOrderHandler, UpdateOrderHandler, DeleteOrderHandler];
// const QueryHandlers = [GetAllOrdersHandler, GetOrderHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    CqrsModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    // OrdersRepository,
    JwtStrategy,
    // ...CommandHandlers,
    // ...QueryHandlers,
    {
        provide: 'IOrdersRepository',
        useClass: OrdersRepository,
      },
  ],
})
export class OrdersModule {}
