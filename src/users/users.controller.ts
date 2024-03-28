import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/users')
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('/users')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get('/users/search')
  async getUserBySearch(
    @Query('email') email: string,
    @Query('username') username: string,
  ) {
    return this.userService.getUserBySearch(email, username);
  }

  @Get('/users/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch('/users/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
