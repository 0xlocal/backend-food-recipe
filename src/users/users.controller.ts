import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.userService.list();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getOne(id);
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    return this.userService.create(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: UserDTO) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    this.userService.delete(id);
  }
}
