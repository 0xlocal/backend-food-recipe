import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './entity/step.entity';
import { StepIngredients } from './entity/step-ingredients.entity';
import { StepDTO } from './dto/step.dto';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step) private readonly stepRepository: Repository<Step>,
    @InjectRepository(StepIngredients)
    private readonly stepIngredientRepository: Repository<StepIngredients>,
  ) {}

  async list(recipeId: number) {
    return await this.stepRepository
      .find({
        relations: ['stepIngredients'],
        where: { recipeId: recipeId },
      })
      .then((items) =>
        items.map((e) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { stepIngredients, ...newData } = e;
          return {
            ...newData,
            amount: e.stepIngredients[0].amount,
            unit: e.stepIngredients[0].unit,
          };
        }),
      );
  }

  async getOne(id: number) {
    const step = await this.stepRepository
      .findOne(id, {
        relations: ['stepIngredients'],
      })
      .then((items) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { stepIngredients, ...newData } = items;
        return {
          ...newData,
          amount: items.stepIngredients[0].amount,
          unit: items.stepIngredients[0].unit,
        };
      });

    if (step) {
      return step;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Step with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(step: StepDTO) {
    try {
      const newStep = this.stepRepository.create({ ...step });
      const savedStep = await this.stepRepository.save(newStep);

      const newStepIngredient = this.stepIngredientRepository.create({
        stepId: savedStep.id,
        ...step,
      });
      await this.stepIngredientRepository.save(newStepIngredient);

      return { id: newStep.id, ...newStep, ...newStepIngredient } as StepDTO;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, stepData: StepDTO) {
    const updateStep: Partial<Step> = { ...stepData };
    const updateStepIngredients: Partial<StepIngredients> = { ...stepData };

    await this.stepRepository.save(updateStep);
    await this.stepIngredientRepository.save(updateStepIngredients);

    // * changing to save because update method cannot save many-to-many relations
    const updatedStep = await this.stepRepository.findOne(id, {
      relations: ['stepIngredients'],
    });

    if (updatedStep) {
      const stepResponse: Partial<StepDTO> = updateStep;
      return { id: updateStep.id, ...stepResponse };
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Step with ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async delete(recipeId: number, id: number) {
    const deleteStepIngredients = await this.stepIngredientRepository.delete({
      stepId: id,
      recipeId: recipeId,
    });
    const deleteStep = await this.stepRepository.delete(id);

    if (!deleteStepIngredients.affected || !deleteStep.affected) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `Step with ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
