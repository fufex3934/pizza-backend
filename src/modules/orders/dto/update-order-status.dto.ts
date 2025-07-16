import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from 'src/common/enums/order.enum';

export class UpdateOrderStatusDto {
  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.PREPARING,
    description: 'New status',
  })
  @IsNotEmpty({ message: 'OrderStatus is required' })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
