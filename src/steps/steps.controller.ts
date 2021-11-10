import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StepsService } from './steps.service';
import { StepDTO } from './dto/step.dto';

@Controller()
export class StepsController {
  constructor(private readonly stepsService: StepsService) {}

  @Get()
  async getCategories(@Param('recipeId') recipeId: number) {
    return await this.stepsService.list(recipeId);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.stepsService.getOne(id);
  }

  @Post()
  async createUser(@Body() step: StepDTO) {
    return this.stepsService.create(step);
  }

  @Put(':id')
  async updateUser(
    @Param('recipeId') recipeId: number,
    @Param('id') id: number,
    @Body() step: StepDTO,
  ) {
    return this.stepsService.update(id, step);
  }

  @Delete(':id')
  async deletePost(
    @Param('recipeId') recipeId: number,
    @Param('id') id: number,
  ) {
    this.stepsService.delete(recipeId, id);
  }
}
