import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/common/enums/order.enum';

export class OrderResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Order ID' })
  id: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Customer ID',
  })
  customerId: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Restaurant ID',
  })
  restaurantId: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Pizza ID' })
  pizzaId: string;

  @ApiProperty({
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    description: 'Additional topping IDs',
  })
  additionalToppingIds: string[];

  @ApiProperty({ example: 12.99, description: 'Total price' })
  totalPrice: number;

  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    description: 'Order status',
  })
  status: string;

  @ApiProperty({
    example: '123 Delivery St, New York, NY',
    description: 'Delivery address',
  })
  deliveryAddress: string;

  @ApiProperty({ example: '+1234567890', description: 'Contact phone number' })
  phoneNumber: string;

  @ApiProperty({
    example: '2023-05-01T12:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: string;
}
