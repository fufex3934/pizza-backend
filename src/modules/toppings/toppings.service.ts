import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topping, ToppingDocument } from './schemas/topping.schema';
import { CreateToppingDto } from './dto/create-topping.dto';
import { ErrorCode } from '../../common/constants/error.constants';

@Injectable()
export class ToppingsService {
  constructor(
    @InjectModel(Topping.name)
    private toppingModel: Model<ToppingDocument>,
  ) {}

  async create(createToppingDto: CreateToppingDto): Promise<Topping> {
    const topping = new this.toppingModel(createToppingDto);
    return topping.save();
  }

  async findAllByRestaurant(restaurantId: string): Promise<Topping[]> {
    return this.toppingModel.find({ restaurantId }).exec();
  }

  async findByIds(ids: string[]): Promise<Topping[]> {
    return this.toppingModel.find({ _id: { $in: ids } }).exec();
  }

  async findOne(id: string, restaurantId: string): Promise<Topping> {
    const topping = await this.toppingModel
      .findOne({ _id: id, restaurantId })
      .exec();
    if (!topping) {
      throw new NotFoundException(
        'Topping not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return topping;
  }
}
