import { UserEntity } from 'src/modules/users/entities/user.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

export interface IProductsRepository {
  findAll(): Promise<ProductEntity[]>;
  findById(id: number): Promise<ProductEntity | undefined>;
  create(createProductDto: CreateProductDto, user: UserEntity): Promise<ProductEntity>;
  update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity>;
  delete(id: number): Promise<void>;
}
