import { Controller, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Post('create')
  async registerRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    @CurrentUser('userId') userId: string,
  ) {
    return await this.restaurantService.create(createRestaurantDto, userId);
  }
}
