import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @ManyToOne(() => UserEntity, user => user.orders)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, product => product.orders)
  product: ProductEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
