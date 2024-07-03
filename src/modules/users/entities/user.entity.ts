import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: true }) // Ensure password is not selected by default
  password: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' }) // Assuming 'USER' and 'ADMIN' roles
  roles: string[];

  @OneToMany(() => ProductEntity, product => product.user)
  products: ProductEntity[];

  @OneToMany(() => OrderEntity, order => order.user)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
