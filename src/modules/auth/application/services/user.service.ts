import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { hashPassword } from 'src/core/utils/passwordHandler';
import { UserRepository } from '../../infrastructure/persistence/postgres/user-repository/user.repository';
import { CreateUserInterface, GetUsersInterface, UpdateUserInterface } from '../../domain/interfaces/user.repository.interface';
import { validateQueryString } from 'src/core/utils/validateQueryString';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserInterface) {
    const hashed = await hashPassword(data.password)
    const user = await this.userRepository.create({
      ...data, password: hashed
    })
    return user
  }

  async findMany(data: {
    ids?: string, page?: number, pageSize?: number
  }) {
      let values: number[] | undefined
      if (data.ids) {
        values = await validateQueryString(data.ids)
      }
      const users = await this.userRepository.findMany({
        ids: values, page: data.page, pageSize: data.pageSize
      })
      if (users.length == 0) throw new NotFoundException()
      return users
  }

  async update(data: UpdateUserInterface) {
    const user = await this.userRepository.update(data)
    return user
  }

  async delete(data: string) {
    const values = await validateQueryString(data)
    const result = await this.userRepository.delete({ids: values})
    return result
  }
}
