import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IUsersRepository } from '../interfaces/users.interface';
import { UserSignUpDto } from '../dtos/user-signup.dto';

@Injectable()
export class UsersRepository implements IUsersRepository {
    private readonly userRepository: Repository<UserEntity>;

    constructor(private dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(UserEntity);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOneById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findOneByUsername(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async create(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
        const user = this.userRepository.create(userSignUpDto);
        return this.userRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findOneById(id);
        this.userRepository.merge(user, updateUserDto);
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOneById(id);
        await this.userRepository.remove(user);
    }
}
