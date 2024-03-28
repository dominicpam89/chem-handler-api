import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  getUsers() {
    return this.repo.find();
  }
  getUser(id: string) {
    return this.repo.findOneBy({ id: parseInt(id) });
  }
  getUserBySearch(email?: string, username?: string): Promise<User[]> {
    if (email) return this.repo.find({ where: { email } });
    if (username) return this.repo.find({ where: { username } });
  }

  createUser(body: CreateUserDto) {
    const user = this.repo.create(body);
    return this.repo.save(user);
  }
  async deleteUser(id: string) {
    const user = await this.getUser(id);
    if (!user) throw new NotFoundException('No user found!');
    return this.repo.remove(user);
  }

  async updateUser(id: string, body: Partial<User>) {
    const user = await this.getUser(id);
    if (!user) throw new NotFoundException('No user found!');
    Object.assign(user, body);
    return this.repo.save(user);
  }
}
