import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pizza, PizzaDocument } from './schemas/pizza.schema';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { ErrorCode } from '../../common/constants/error.constants';
import { ToppingsService } from '../toppings/toppings.service';

@Injectable()
export class PizzasService {
  constructor(
    @InjectModel(Pizza.name) private pizzaModel: Model<PizzaDocument>,
    private toppingsService: ToppingsService,
  ) {}

  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    const { restaurantId, defaultToppingIds = [] } = createPizzaDto;

    if (!restaurantId) {
      throw new Error('Restaurant ID is required to create a pizza');
    }

    if (defaultToppingIds.length > 0) {
      await this.validateToppings(restaurantId, defaultToppingIds);
    }

    const pizza = new this.pizzaModel(createPizzaDto);
    return pizza.save();
  }

  async findAllByRestaurant(restaurantId: string): Promise<Pizza[]> {
    return this.pizzaModel.find({ restaurantId }).exec();
  }

  async findOne(id: string, restaurantId: string): Promise<Pizza> {
    const pizza = await this.pizzaModel
      .findOne({ _id: id, restaurantId })
      .exec();
    if (!pizza) {
      throw new NotFoundException(
        'Pizza not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return pizza;
  }

  private async validateToppings(
    restaurantId: string,
    toppingIds: string[],
  ): Promise<void> {
    const toppings = await this.toppingsService.findByIds(toppingIds);
    const invalidToppings = toppings.filter(
      (t) => t.restaurantId !== restaurantId,
    );
    if (invalidToppings.length > 0) {
      throw new NotFoundException(
        'Some toppings do not belong to this restaurant',
        ErrorCode.VALIDATION_ERROR,
      );
    }
  }
}
