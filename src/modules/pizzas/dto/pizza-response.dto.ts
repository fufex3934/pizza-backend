import { ApiProperty } from '@nestjs/swagger';

export class PizzaResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Pizza ID' })
  id: string;

  @ApiProperty({ example: 'Margherita', description: 'Pizza name' })
  name: string;

  @ApiProperty({
    example: 'Classic tomato and mozzarella',
    description: 'Description',
  })
  description: string;

  @ApiProperty({ example: 9.99, description: 'Base price' })
  basePrice: number;

  @ApiProperty({
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    description: 'Default topping IDs',
  })
  defaultToppingIds: string[];

  @ApiProperty({
    example: 'https://example.com/margherita.jpg',
    description: 'Image URL',
    required: false,
  })
  image?: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Restaurant ID',
  })
  restaurantId: string;
}
