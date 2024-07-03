import { UserEntity } from '../entities/user.entity';
import { UserSignUpDto } from '../dtos/user-signup.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { QueryRunner } from 'typeorm';

// export interface IUsersRepository {
//   findOneByEmail(email: string): Promise<UserEntity | undefined>;
//   findOneByUsername(username: string): Promise<UserEntity | undefined>;
//   createUser(userSignUpDto: UserSignUpDto): Promise<UserEntity>;
// }


export interface IUsersRepository {
    // signup(userSignUpDto: UserSignUpDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOneById(id: number): Promise<UserEntity>;
    findOneByEmail(email: string): Promise<UserEntity | undefined>;
    findOneByUsername(username: string): Promise<UserEntity | undefined>;
    create(ceateUserDto: CreateUserDto, queryRunner: QueryRunner): Promise<UserEntity>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: number): Promise<void>;
}