import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductEntity } from './entities/product.entity';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { ProductsRepository } from './repositories/product.repository';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UnitOfWork } from '../utility/common/unit-of-work';

// const CommandHandlers = [CreateProductHandler, UpdateProductHandler, DeleteProductHandler];
// const QueryHandlers = [GetAllProductsHandler, GetProductHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    CqrsModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    JwtStrategy,
    // ...CommandHandlers,
    // ...QueryHandlers,
    {
      provide: 'IProductsRepository',
      useClass: ProductsRepository,
    },
    UnitOfWork,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
