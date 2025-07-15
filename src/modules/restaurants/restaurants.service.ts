import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ErrorCode } from 'src/common/constants/error.constants';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly userService: UsersService,
  ) {}
  async create(
    createRestaurantDto: CreateRestaurantDto,
    ownerId: string,
  ): Promise<Restaurant> {
    const existingRestaurant = await this.restaurantModel.findOne({ ownerId });
    if (existingRestaurant) {
      throw new ConflictException(
        'User already own a restaurant',
        ErrorCode.CONFLICT,
      );
    }
    const emailExists = await this.restaurantModel.findOne({
      email: createRestaurantDto.email,
    });
    if (emailExists) {
      throw new ConflictException(
        'Email already in use by another restaurant',
        ErrorCode.EMAIL_ALREADY_EXISTS,
      );
    }

    const restaurant = new this.restaurantModel({
      ...createRestaurantDto,
      ownerId,
    });
    await restaurant.save();

    //update user to be restaurant owner
    await this.userService.updateUser(ownerId, {
      restaurantId: restaurant._id.toString(),
      type: 'restaurant',
      roles: ['super-admin'],
    });
    return restaurant;
  }

  async findById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) {
      throw new NotFoundException(
        'Restaurant not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return restaurant;
  }

  async findByOwner(ownerId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantModel.findOne({ ownerId }).exec();
    if (!restaurant) {
      throw new NotFoundException(
        'Restaurant not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return restaurant;
  }
}
