import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { PizzaResponseDto } from './dto/pizza-response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../common/decorators/permissions.decorator';
import { Permissions as PermissionsEnum } from '../../common/constants/permissions.constants';
// import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Post()
  @Roles(PermissionsEnum.MANAGE_MENU)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new pizza' })
  @ApiResponse({
    status: 201,
    description: 'Pizza created successfully',
    type: PizzaResponseDto,
  })
  async create(
    @CurrentUser('restaurantId') restaurantId: string,
    @Body() createPizzaDto: CreatePizzaDto,
  ) {
    return this.pizzasService.create({
      ...createPizzaDto,
      restaurantId: restaurantId,
    });
  }

  @Get('restaurant/:restaurantId')
  @ApiOperation({ summary: 'Get all pizzas for a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'List of pizzas',
    type: [PizzaResponseDto],
  })
  async findAllByRestaurant(
    @Param('restaurantId') restaurantId: string,
    // @Query() paginationDto: PaginationDto,
  ) {
    return this.pizzasService.findAllByRestaurant(restaurantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pizza by ID' })
  @ApiResponse({
    status: 200,
    description: 'Pizza found',
    type: PizzaResponseDto,
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser('restaurantId') restaurantId: string,
  ) {
    return this.pizzasService.findOne(id, restaurantId);
  }
}
