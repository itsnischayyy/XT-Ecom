import { UserEntity } from '../../users/entities/user.entity';
import { ProductEntity } from '../../products/entities/product.entity';

export class CreateOrderDto {
  user: UserEntity; // Assuming you pass the UserEntity or user id here
  product: ProductEntity; // Assuming you pass the ProductEntity or product id here
  totalPrice: number;
}
