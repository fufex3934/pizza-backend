import { ApiProperty } from '@nestjs/swagger';

export class RestaurantResponseDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Restaurant ID',
  })
  id: string;

  @ApiProperty({ example: 'Pizza Heaven', description: 'Restaurant name' })
  name: string;

  @ApiProperty({ example: '123 Main St, New York, NY', description: 'Address' })
  address: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number' })
  phone: string;

  @ApiProperty({ example: 'pizza@example.com', description: 'Contact email' })
  email: string;

  @ApiProperty({
    example: 'Authentic Italian pizza since 1990',
    description: 'Description',
  })
  description: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'Logo URL',
    required: false,
  })
  logo?: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Owner user ID',
  })
  ownerId: string;
}
