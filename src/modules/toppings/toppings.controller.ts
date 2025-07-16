import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ToppingsService } from './toppings.service';
import { CreateToppingDto } from './dto/create-topping.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ToppingResponseDto } from './dto/topping-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../common/decorators/permissions.decorator';
import { Permissions as PermissionsEnum } from '../../common/constants/permissions.constants';

@ApiTags('Toppings')
@ApiBearerAuth()
@Controller('toppings')
export class ToppingsController {
  constructor(private readonly toppingsService: ToppingsService) {}

  @Post()
  @Roles(PermissionsEnum.MANAGE_MENU)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new topping' })
  @ApiResponse({
    status: 201,
    description: 'Topping created successfully',
    type: ToppingResponseDto,
  })
  async create(
    @CurrentUser('restaurantId') restaurantId: string,
    @Body() createToppingDto: CreateToppingDto,
  ) {
    return this.toppingsService.create({
      ...createToppingDto,
      restaurantId: restaurantId,
    });
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get all toppings for a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'List of toppings',
    type: [ToppingResponseDto],
  })
  async findAllByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.toppingsService.findAllByRestaurant(restaurantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get topping by ID' })
  @ApiResponse({
    status: 200,
    description: 'Topping found',
    type: ToppingResponseDto,
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser('restaurantId') restaurantId: string,
  ) {
    return this.toppingsService.findOne(id, restaurantId);
  }
}
