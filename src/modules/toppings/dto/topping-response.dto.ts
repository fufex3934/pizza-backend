import { ApiProperty } from '@nestjs/swagger';

export class ToppingResponseDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Topping ID',
  })
  id: string;

  @ApiProperty({ example: 'Mozzarella', description: 'Topping name' })
  name: string;

  @ApiProperty({ example: 1.5, description: 'Additional price' })
  price: number;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Restaurant ID',
  })
  restaurantId: string;
}
