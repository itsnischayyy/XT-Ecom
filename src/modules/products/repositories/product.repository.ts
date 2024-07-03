import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { IProductsRepository } from '../interfaces/product.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Injectable()
export class ProductsRepository implements IProductsRepository {
//   constructor(
//     // @InjectRepository(ProductEntity)
//     private readonly productRepository: Repository<ProductEntity>,
//   ) {}
private readonly productRepository: Repository<ProductEntity>;
constructor(private dataSource: DataSource) {
    this.productRepository = this.dataSource.getRepository(ProductEntity);
}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findById(id: number): Promise<ProductEntity | undefined> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(createProductDto: CreateProductDto, user: UserEntity): Promise<ProductEntity> {
    const product = this.productRepository.create(createProductDto);
    product.user = user;
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findById(id);
    if (!product) {
      // Handle error if product with given id not found
      throw new Error(`Product with id ${id} not found`);
    }
    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    const product = await this.findById(id);
    if (!product) {
      // Handle error if product with given id not found
      throw new Error(`Product with id ${id} not found`);
    }
    await this.productRepository.remove(product);
  }
}
