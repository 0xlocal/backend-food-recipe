import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepIngredients } from './entity/step-ingredients.entity';
import { Step } from './entity/step.entity';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Step, StepIngredients])],
  controllers: [StepsController],
  providers: [StepsService],
})
export class StepsModule {}
