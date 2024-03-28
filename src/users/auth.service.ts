import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup(body: CreateUserDto) {
    // check whether body.email has existed in users database
    const [user] = await this.userService.getUserBySearch(body.email);
    if (user)
      throw new BadRequestException(
        'User with given email is already existed!',
      );
  }
  signin() {}
  signout() {}
}
