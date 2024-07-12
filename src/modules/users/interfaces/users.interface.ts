// import { UserEntity } from '../entities/user.entity';
// import { UserSignUpDto } from '../dtos/user-signup.dto';
// import { UpdateUserDto } from '../dtos/update-user.dto';
// import { QueryRunner } from 'typeorm';

// export interface IUsersRepository {
//     findAll(queryRunner?: QueryRunner): Promise<UserEntity[]>;
//     findOneById(id: number, queryRunner?: QueryRunner): Promise<UserEntity>;
//     findOneByEmail(email: string, queryRunner?: QueryRunner): Promise<UserEntity | undefined>;
//     findOneByUsername(username: string, queryRunner?: QueryRunner): Promise<UserEntity | undefined>;
//     create(userSignUpDto: UserSignUpDto, queryRunner: QueryRunner): Promise<UserEntity>;
//     update(id: number, updateUserDto: UpdateUserDto, queryRunner?: QueryRunner): Promise<UserEntity>;
//     remove(id: number, queryRunner?: QueryRunner): Promise<void>;
// }
import { UserEntity } from '../entities/user.entity';
import { UserSignUpDto } from '../dtos/user-signup.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { QueryRunner } from 'typeorm';

export interface IUsersRepository {
    findAll(queryRunner?: QueryRunner): Promise<UserEntity[]>;
    findOneById(id: number, queryRunner?: QueryRunner): Promise<UserEntity>;
    findOneByEmail(email: string, queryRunner?: QueryRunner): Promise<UserEntity | undefined>;
    findOneByUsername(username: string, queryRunner?: QueryRunner): Promise<UserEntity | undefined>;
    create(userSignUpDto: UserSignUpDto, queryRunner?: QueryRunner): Promise<UserEntity>;
    update(id: number, updateUserDto: UpdateUserDto, queryRunner?: QueryRunner): Promise<UserEntity>;
    remove(id: number, queryRunner?: QueryRunner): Promise<void>;
}
