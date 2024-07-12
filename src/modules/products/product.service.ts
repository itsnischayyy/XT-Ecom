import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';
import { IProductsRepository } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from '../users/entities/user.entity';
import { EventBus } from '@nestjs/cqrs';
import { UnitOfWork } from '../utility/common/unit-of-work';
@Injectable()
export class ProductsService {
  constructor(
    @Inject('IProductsRepository') private readonly productRepository: IProductsRepository,
    private eventBus: EventBus,
    private readonly unitOfWork: UnitOfWork,
  ) { }

  async create(createProductDto: CreateProductDto, user: any): Promise<ProductEntity> {
    // const queryRunner = this.unitOfWork.getQueryRunner();
    const product = this.productRepository.create(createProductDto, user);
    // if (0 == 0) {
    //   throw new BadRequestException('Simulated failure after user creation.');
    // }
    return product;
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findById(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number): Promise<void> {
    return this.productRepository.delete(id);
  }
}
