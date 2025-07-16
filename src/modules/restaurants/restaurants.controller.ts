import { Controller, Get, Post } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/permissions.decorator';
import { Permissions as PermissionsEnum } from 'src/common/constants/permissions.constants';
import { RestaurantResponseDto } from './dto/restaurant-response.dto';
@ApiTags('Restaurants')
@ApiBearerAuth()
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @Post('create')
  @Roles(PermissionsEnum.MANAGE_RESTAURANT)
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({
    status: 201,
    description: 'Restaurant created successfully',
    type: RestaurantResponseDto,
  })
  async registerRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    @CurrentUser('userId') userId: string,
  ) {
    return await this.restaurantService.create(createRestaurantDto, userId);
  }

  @Get('my-restaurant')
  @Roles(PermissionsEnum.VIEW_RESTAURANT)
  @ApiOperation({ summary: 'Get current user restaurant' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant found',
    type: RestaurantResponseDto,
  })
  async getMyRestaurant(@CurrentUser('userId') userId: string) {
    return this.restaurantService.findByOwner(userId);
  }
}
