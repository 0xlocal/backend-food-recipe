import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entity/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async list() {
    const users = await this.userRepository.find();
    return users as UserDTO[];
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if (user) {
      return user as UserDTO;
    }

    throw new HttpException(
      { status: HttpStatus.NOT_FOUND, error: `User with id ${id} not found` },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(user: UserDTO) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return newUser as UserDTO;
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.INTERNAL_SERVER_ERROR, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, user: UserDTO) {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne(id);

    if (updatedUser) {
      return updatedUser as UserDTO;
    }

    throw new HttpException(
      { status: HttpStatus.NOT_FOUND, error: `User with id ${id} not found` },
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(id: number) {
    const deletedUser = await this.userRepository.delete(id);

    if (!deletedUser.affected) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: `User with id ${id} not found` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
