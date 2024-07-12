import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IUsersRepository } from '../interfaces/users.interface';
import { UserSignUpDto } from '../dtos/user-signup.dto';
import { UnitOfWork } from 'src/modules/utility/common/unit-of-work';

@Injectable()
export class UsersRepository implements IUsersRepository {
    private readonly userRepository: Repository<UserEntity>;

    constructor(private dataSource: DataSource,
        private readonly unitOfWork: UnitOfWork,
    ) {
        this.userRepository = this.dataSource.getRepository(UserEntity);
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOneById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.unitOfWork.getQueryRunner().manager.findOne(UserEntity, { where: { email } });
        // return this.userRepository.findOne({ where: { email } });
    }

    async findOneByUsername(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async create(userSignUpDto: UserSignUpDto, queryRunner: QueryRunner): Promise<UserEntity> {
        const user = this.userRepository.create(userSignUpDto);
        // return this.userRepository.save(user, queryRunner);
        // return await queryRunner.manager.save(user, queryRunner);
        return await this.unitOfWork.getQueryRunner().manager.save(user);
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
