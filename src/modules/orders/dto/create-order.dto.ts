import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsValidPhoneNumber } from 'src/common/validators/phone.validator';

export class CreateOrderDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011', description: 'Pizza ID' })
  @IsNotEmpty({ message: 'pizzaId is required' })
  @IsString({ message: 'pizzaId must be a string' })
  pizzaId: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Restaurant ID',
  })
  @IsNotEmpty({ message: 'restaurantId is required' })
  @IsString({ message: 'restaurantId must be a string' })
  restaurantId: string;

  @ApiProperty({
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    description: 'Additional topping IDs',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  additionalToppingIds?: string[];

  @ApiProperty({
    example: '123 Delivery St, New York, NY',
    description: 'Delivery address',
  })
  @IsNotEmpty({ message: 'deliveryAddress is required' })
  @IsString({ message: 'deliveryAddress must be string' })
  deliveryAddress: string;

  @ApiProperty({ example: '+1234567890', description: 'Contact phone number' })
  @IsNotEmpty({ message: 'phoneNumber is required' })
  @Validate(IsValidPhoneNumber)
  phoneNumber: string;

  @ApiProperty({
    example: '507f1f77bcf86cd799439099',
    description: 'User ID',
    required: false,
  })
  @IsString()
  userId?: string;
}
