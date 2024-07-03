import { Inject, Injectable } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { IOrdersRepository } from './interfaces/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventBus } from '@nestjs/cqrs';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('IOrdersRepository') private readonly orderRepository: IOrdersRepository,
    private eventBus: EventBus,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderRepository.create(createOrderDto);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.findAll();
  }

  async findOne(id: number): Promise<OrderEntity> {
    return this.orderRepository.findById(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    return this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number): Promise<void> {
    return this.orderRepository.delete(id);
  }
}
