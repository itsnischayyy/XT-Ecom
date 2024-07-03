import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserSignUpDto } from '../dtos/user-signup.dto';

export interface IUsersRepository {
    // signup(userSignUpDto: UserSignUpDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOneById(id: number): Promise<UserEntity>;
    findOneByEmail(email: string): Promise<UserEntity | undefined>;
    findOneByUsername(username: string): Promise<UserEntity | undefined>;
    create(ceateUserDto: CreateUserDto): Promise<UserEntity>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: number): Promise<void>;
}
