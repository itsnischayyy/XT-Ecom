import { UserEntity } from "src/modules/users/entities/user.entity";

export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    // user: UserEntity; // Assuming you pass the UserEntity or user id here
  }
  