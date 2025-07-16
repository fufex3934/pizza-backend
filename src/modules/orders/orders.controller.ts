import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderResponseDto } from './dto/order-response.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/permissions.decorator';
import { Permissions as PermissionsEnum } from 'src/common/constants/permissions.constants';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: OrderResponseDto,
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.ordersService.create({
      ...createOrderDto,
      userId,
    });
  }

  @Get('my-orders')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user orders' })
  @ApiResponse({
    status: 200,
    description: 'List of orders',
    type: [OrderResponseDto],
  })
  async GetMyOrders(@CurrentUser('userId') userId: string) {
    return this.ordersService.findAllByCustomer(userId);
  }

  @Get('restaurant-orders')
  @Roles(PermissionsEnum.MANAGE_ORDERS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get restaurant orders' })
  @ApiResponse({
    status: 200,
    description: 'List of orders',
    type: [OrderResponseDto],
  })
  async getRestaurantOrders(@CurrentUser('restaurantId') restaurantId: string) {
    return this.ordersService.findAllByRestaurant(restaurantId);
  }

  @Patch(':id/status')
  @Roles(PermissionsEnum.MANAGE_ORDERS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({
    status: 200,
    description: 'Order status updated',
    type: OrderResponseDto,
  })
  async updateStatus(
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @CurrentUser('restaurantId') restaurantId: string,
    @Param('id') id: string,
  ) {
    return this.ordersService.updateStatus(
      id,
      restaurantId,
      updateOrderStatusDto.status,
    );
  }
}
