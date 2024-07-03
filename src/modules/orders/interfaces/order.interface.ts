import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderEntity } from '../entities/order.entity';

export interface IOrdersRepository {
  findAll(): Promise<OrderEntity[]>;
  findById(id: number): Promise<OrderEntity | undefined>;
  create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
  update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
  delete(id: number): Promise<void>;
}
