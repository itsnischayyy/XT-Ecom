import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomUserEvent } from '../events/custom-user.event';

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

  private events: any[] = [];

  static created(employeeId: string): CustomUserEvent {
    return new CustomUserEvent(employeeId);
  }

  @BeforeInsert()
  beforeInsert() {
    console.log('Before Insert event of employee called:', this);
  }

  @AfterInsert()
  afterInsert() {
    console.log('After Insert event of employee called:', this);
    this.events.push(new CustomUserEvent(this.id));
  }
}
